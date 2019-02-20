import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import PanoramaVertical from "@material-ui/icons/PanoramaVertical";
import LocalDining from "@material-ui/icons/LocalDining";
import LocalShipping from "@material-ui/icons/LocalShipping";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Camera from "@material-ui/icons/AddAPhoto";
import Drawer from "@material-ui/core/Drawer"; 
import Dialog from "@material-ui/core/Dialog";
import Fab from "@material-ui/core/Fab";
import Add from "@material-ui/icons/Add";

import { fetchItemName, Item, fetchAllItems } from "lib";
import { Refri } from "./Refrigerator";
import * as Style from "./App.css";

enum NavTab {
    refrigerator,
    get,
    reccomend,
    add
}

function App(){
    const [images, setImages] = useState<Images[]>([]);
    const [tab, setTab] = useState(NavTab.refrigerator);
    const [items, setItems] = useState<Item[]>([])
    const [onadd, setonAdd] = useState(false);

    useEffect(() => {
        fetchAllItems().then((items) => {
            setItems(items);
        })
    },[])

    function onInsertPhoto(){
        setTab(NavTab.add);
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

    function onTabChange(ev: React.ChangeEvent<{}>, val: any){
        setTab(val);
        if(val == NavTab.refrigerator){
            fetchAllItems().then((items) => {
                setItems(items);
            })
        }
    }

    return(
        <div className={Style.base}>

            <AppBar className={Style.header}>
                <Typography variant="h5" color="textSecondary" className={Style.title}>
                    Food Cycle
                </Typography>
                <Camera fontSize="large" className={Style.account} onClick={onInsertPhoto} />
            </AppBar>

            {(function(){
            switch (tab) {
                case NavTab.refrigerator:
                    return (<Refri className={Style.refri} items={items}/>)
                case NavTab.add:
                    return (
                        <div className={Style.drawer}>
                            <div className={Style.gridCtnr}>
                                <GridList cellHeight={160} cols={2} className={Style.gridList}>
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
                            <Fab className={Style.addFab} variant="extended" color="secondary">
                                <Add />
                                冷蔵庫に追加
                            </Fab>
                        </div>
                    )
                default:
                    return null;
            }
            })()}

            <AppBar position="fixed" className={Style.footer}>
                <Tabs value={tab}
                    onChange={onTabChange}
                    className={Style.footerNav}
                    variant="fullWidth"
                    indicatorColor="secondary"
                >
                    <Tab value={NavTab.refrigerator} label="冷蔵庫" icon={<PanoramaVertical />} />
                    <Tab value={NavTab.reccomend} label="おすすめ" icon={<LocalDining />} />
                    <Tab value={NavTab.get} label="注文" icon={<LocalShipping />} />
                </Tabs>
            </AppBar>
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
