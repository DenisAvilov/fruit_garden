import { AuthType } from "@/types/user";
import { $authHost } from "./api";
import { AxiosResponse } from "axios";
import { AuthResponse } from "@/models/response/AuthResponse";
import { iUser } from "@/models/response/iUser";

 class UserService{ 
 static Users(email: string, password: string):Promise<AxiosResponse<iUser[]>> {
    return $authHost.get<iUser[]>("/user/getall")    
  } 
}


