import * as React from "react";
import * as ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CSSBaseline from "@material-ui/core/CssBaseline";
import App from "./App";

const theme = createMuiTheme({
    palette:{
        primary:{main: "#CA423B"},
        secondary:{main: "#388e3c"},
        text: {
            secondary: "#FFFFFF"
        }
    }
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CSSBaseline>
            <App />
        </CSSBaseline>
    </MuiThemeProvider>,
    document.getElementById("App")
)