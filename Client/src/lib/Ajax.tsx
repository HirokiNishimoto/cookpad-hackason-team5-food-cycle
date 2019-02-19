import axios from "axios";

export async function fetchItemName(file: File):Promise<string>{
    const data = new FormData();
    data.append("file",file);
    const response = await axios.post("/itemname/",data);
    return response.data.name
}