import axios from "axios";
import { Item } from "lib";

export async function fetchItemName(file: File):Promise<string>{
    const data = new FormData();
    data.append("file",file);
    const response = await axios.post("/ml/itemname/",data);
    return response.data.name
}

export async function fetchAllItems():Promise<Item[]>{
    const data = await axios.get("/item/")
    var retval: Item[] = [];
    for(let item of data.data){
        retval.push({name:item.name,count:item.count,id:item.id})
    }
    return retval;
}

export async function postItems(name:string,count: number){
    axios.post("/item/create/",{name:name, count:count})
}

export async function updateCount(id: string, count: number){
    axios.post("/item/update/",{id:id,count:count})
}