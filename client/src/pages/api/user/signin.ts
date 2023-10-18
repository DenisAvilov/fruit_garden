import {$host, $authHost} from "../index"
import { AuthType } from '../../../types/user'
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import {  loginOut, loginSuccess } from '@/store/slice/authSlice';
import { parseCookies } from 'nookies'
// разпарсим токен
import jwt_decode from "jwt-decode";
import { AuthResponse } from "@/models/response/AuthResponse";
import { iUser } from "@/models/response/iUser";


export const  singUp =  async (email: string, password: string ): Promise<iUser> => {

    try {
      const {data} = await $host.post<AuthResponse>("/user/sign-up", {email, password, role: 'ADMIN'});   //ADMIN,USER
      
      localStorage.setItem('token', data.tokens.accessToken)  
      return  data.user 

    } catch (error: any) {
  const errorMessage = error.response?.data?.message || 'Unknown error';
  return  errorMessage;
} 
  }


export const  signIn =  async (values: AuthType): Promise<iUser> => {  
    try {
      const {data} = await $host.post<AuthResponse>("/user/sign-in", values);       
      localStorage.setItem('token', data.tokens.accessToken)      
      return data.user      
    } catch (error: any) {
  const errorMessage = error.response?.data?.message || 'Unknown error';
  return  errorMessage;
}
  }


// export const check =  async () => {
//     try {
//       const data = await $authHost.get("/user/check");            
//       console.log('signin.in check data', data)
//       return data
//     } catch (error: any) {   
//       console.log('signin.in check error', error)
//       return error;     
//     }
//   }


//  export const authRefresh = async () => {  
//   try{
//     const user = await $host.get( "/refresh" ) 
//     localStorage.setItem('token', user.data.tokens.accessToken)     
//     return user.data.user
     
//   }
//   catch(e){
//     return console.log('eeee', e)
//   }
//  } 

 export const  logOut = async() =>{
    try{    
     const rez = await $host.post("/user/logout")
      localStorage.removeItem('token')     
     return rez.data
    }
    catch(e: any ){
      return e
    }
  }



class AuthService{
  
  async login(email: string, password: string) {
    try {
       $host.post<AuthType>("/user/signin", {email,});
      
     
    } catch (error: any) {
    
    
      return error;
     
    }
  }
 
 async singUp(values:AuthType){
  try{
   const response = await $host.post<AuthType>("/user/signup",values)
   const data = response.data;
   return data
  }
  catch(error: any){
     if (error.response) {
      // Обработка ошибки от сервера
      console.log('test data', error.response.data);
      console.log('me err',error.response.status);
      console.log(error.response.headers);
      return error
    } else if (error.request) {
      // Обработка ошибки, если запрос не был выполнен
      console.log(error.request);
    } else {
      // Обработка других ошибок
      console.log('Error', error.message);
    }
    console.log(error);
  }
    
  } 



  async logOut(){
    try{    
     const rez = await $host.post("/user/logout")
     return rez
    }
    catch(e){
      return e
    }
  }
  
}


// eslint-disable-next-line import/no-anonymous-default-export
// export default new  Auth()



