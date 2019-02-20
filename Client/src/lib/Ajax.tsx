import axios from "axios";
import { Item } from "lib";

export async function fetchItemName(file: File):Promise<string>{
    const data = new FormData();
    data.append("file",file);
    const response = await axios.post("/ml/itemname/",data);
    return response.data.name
}

export async function fetchAllItems():Promise<Item[]>{
    return [
        {name: "carrot", count: 3},
        {name: "tomato", count: 4}
    ]
}