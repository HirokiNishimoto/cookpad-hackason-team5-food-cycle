import * as React from "react";
import * as ReactDOM from "react-dom";
import { 
    Dialog as _Dialog, DialogTitle, DialogContent,
    DialogActions, DialogContentText, Button
} from "@material-ui/core";
import { Err400, Err401, Err404, Err405, Err500, Err} from "./Message";

type DialogType = "default" | "custom" | "waiting" | "reqError";

export type DialogCallBack = () => void;

export interface DialogActionProps {
    label: string
    onClick: DialogCallBack
}

export class Dialog {
    private static id = "Dialog"
    private static type: DialogType = "default" 
    static size?: "small" | "normal" | "large" | "none" = "none"
    static title? = ""
    static message?: string
    static statusCode?: number
    static children?: React.ReactElement<any>[]
    private static actions: DialogActionProps[]
    
    /**
     * ダイアログの初期化も行う    
     *    "default"  - size, title, message, actions のみで構成    
     *    "custom"   - size, children のみで構成 childrenには@material-ui/coreからDialogTitleなどを利用
     *    "reqError" - statusCode, actions のみで構成    
     *    "waiting"  - waitingアニメーションを表示(未実装)    
     *
     * @static
     * @param {"default" | "custom" | "waiting" | "reqError"} type
     * @memberof Dialog
     */
    static setType(type:DialogType){
        Dialog.title = undefined; Dialog.message = undefined; 
        Dialog.statusCode = undefined; Dialog.children = undefined; Dialog.actions = [];
        Dialog.type = type;
    }

    static activate(){
        if(!document.getElementById(Dialog.id)){
            console.error("Error in Dialog.activate()\nid=\"Dialog\"のdivが必要です。")
            alert("ダイアログのエラー");
        }
        ReactDOM.render(
            Dialog.createDialog(),
            document.getElementById(Dialog.id)
            )
        }
        
    static close(){
        ReactDOM.render(
            Dialog.createDialog(false),
            document.getElementById(Dialog.id)
        )
    }

    static pushActions(label: string,onClick: DialogCallBack){
        Dialog.actions.push({label: label, onClick:onClick})
    }

    private static createDialog(active: boolean = true):JSX.Element{
        const contents: React.ReactElement<any>[] = []
        switch(Dialog.type){
            case "default":
                contents.push(
                    <DialogTitle >{Dialog.title}</DialogTitle>,
                    <DialogContent>
                        <DialogContentText>
                            {Dialog.message}
                        </DialogContentText>
                    </DialogContent>,
                    <DialogActions>
                    {Dialog.actions.map((action,index) => (
                        <Button key={index} onClick={action.onClick} >
                            {action.label}
                        </Button>
                    ))}
                    </DialogActions>
                )
            break;

            case "custom":
                const children = this.children;
                if(children) contents.push(...children)
                break;

            case "waiting":
                contents.push(<div>waiting...</div>)
                break;

            case "reqError":
                contents.push(
                    <DialogTitle >{"ERROR"}</DialogTitle>,
                    <DialogContent>
                        <DialogContentText>
                            {Dialog.getErrorMSGByStatusCode(Dialog.statusCode)}
                        </DialogContentText>
                    </DialogContent>,
                    <DialogActions>
                    {Dialog.actions.map((action,index) => (
                        <Button key={index} onClick={action.onClick} >
                            {action.label}
                        </Button>
                    ))}
                    </DialogActions>
                )
                break;
        }

        const width = 
            Dialog.size == "large"  ? "xl" :
            Dialog.size == "normal" ? "md" :
            Dialog.size == "small"  ? "sm" : "sm"
        var fullWidth = true;
        if(Dialog.size == "none") fullWidth = false;

        return <_Dialog 
            maxWidth={width}
            fullWidth={fullWidth}
            open={active}
        >
            {contents}
        </_Dialog>
    }

    private static getErrorMSGByStatusCode(code?: number):string{
        switch(code){
            case 400: return Err400;
            case 401: return Err401;
            case 404: return Err404;
            case 405: return Err405;
            case 500: return Err500;
            default:  return Err+`(${code})`;
        }
    }
}