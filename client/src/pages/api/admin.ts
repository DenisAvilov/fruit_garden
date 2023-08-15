
import { iUser } from "@/models/response/iUser";
import { $authHost } from "./index";
import { AuthResponse } from "@/models/response/AuthResponse";


export const  admin =  async () => {
try{   
   const {data} = await $authHost.get("/admin");

   return data
}
   catch(e){console.log('e', e)}
}