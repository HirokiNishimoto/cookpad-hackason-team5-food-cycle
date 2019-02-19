import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Camera from "@material-ui/icons/AddAPhoto";

import { fetchItemName } from "lib";
import * as Style from "./App.css";

function App(){
    const [images, setImages] = useState<Images[]>([]);

    function onInsertPhoto(){
        const camera = document.getElementById("camera-input") as HTMLInputElement;
        camera.click();
    }

    async function onChangeImage(ev:React.ChangeEvent<HTMLInputElement>){
        const reader = new FileReader();
        const files = ev.target.files;
        if(files == null) return;
        const file = files.item(0);
        if(file == null) return;
        const index = images.length;
        reader.onload = function(e:ProgressEvent){
            setImages((prevState) => {
                const url = (e.target as any).result as string;
                return prevState.concat({file: file, title: "", url: url});
            })
            fetchItemName(file).then((name) => {
                console.log("sam")
                setImages((prevState) => (
                    prevState.map((state,i) => {
                        if(i != index) return state;
                        return {file: state.file, title:name, url: state.url}
                    })
                ))
            })
        }

        reader.readAsDataURL((ev.target.files as FileList)[0]);

    }

    return(
        <div>
            <AppBar className={Style.header}>
                <Typography variant="h5" color="textSecondary" className={Style.title}>
                    Food Cycle
                </Typography>
                <Camera fontSize="large" className={Style.account} onClick={onInsertPhoto} />
            </AppBar>

            <div className={Style.gridCtnr}>
                <GridList cellHeight={160} cols={1} className={Style.gridList}>
                {images.map((image) => (
                    <GridListTile key={image.file.name} cols={1}>
                        <img src={image.url} alt="error"/>
                        {image.title == "" ? null :
                        <GridListTileBar title={image.title}/>
                        }
                    </GridListTile>
                ))}
                </GridList>
            </div>

            <form action="">
                <input type="file" accept="image/" hidden id="camera-input" onChange={onChangeImage}/>
            </form>
        </div>
    )

}

export default App

interface Images{
    file: File;
    title: string;
    url: string;
}