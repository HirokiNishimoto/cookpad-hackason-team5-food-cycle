import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { Item } from "lib";
import { ListItemText, Divider, ListSubheader, MuiThemeProvider, createMuiTheme } from "@material-ui/core";

interface Props {
    className: string;
    items: Item[]
}

const theme = createMuiTheme({
    palette:{
        primary:{main: "#CA423B"},
        secondary:{main: "#388e3c"},
        text: {
            secondary: "#000000"
        }
    }
})

export function Refri(props: Props){
    return(
        <div className={props.className}>
        <MuiThemeProvider theme={theme}>
        <ListSubheader> 食材 </ListSubheader>
        {props.items.map((item) => [
            <ListItem>
                <ListItemText primary={item.name} secondary={"量数: "+item.count}/>
            </ListItem>,
            <Divider variant="middle"/>
        ])}
        </MuiThemeProvider>
        </div>
    )
}
