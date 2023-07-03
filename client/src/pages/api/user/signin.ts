import {$host, $authHost} from "../index"
import { AuthType, UserResponseType } from '../../../types/user'
import { AxiosError, AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import {  loginSuccess } from '@/store/slice/authSlice';
import { parseCookies } from 'nookies'
// разпарсим токен
import jwt_decode from "jwt-decode";
import { AuthResponse } from "@/models/response/AuthResponse";


export const  singUp =  async (email: string, password: string ): Promise<AxiosResponse<AuthResponse>> => {

    try {
      const {data} = await $host.post<AuthResponse>("api/user/signup", {email, password, role: "ADMIN"});   
      localStorage.setItem('token', data.tokens.accessToken)   
       return jwt_decode(data.tokens.accessToken)       
    } catch (error: any) {
  const errorMessage = error.response?.data?.message || 'Unknown error';
  return  errorMessage;
}
  }


export const  signIn =  async (values: AuthType): Promise<AxiosResponse<AuthResponse>> => {  
    try {
      const {data} = await $host.post<AuthResponse>("api/user/signin", values);       
      localStorage.setItem('token', data.tokens.accessToken)      
      return jwt_decode(data.tokens.accessToken)       
    } catch (error: any) {
  const errorMessage = error.response?.data?.message || 'Unknown error';
  return  errorMessage;
}
  }


export const check =  async () => {
    try {
      const data = await $authHost.get("api/user/check");            
      console.log('signin.in check data', data)
      return data
    } catch (error: any) {   
      console.log('signin.in check error')
      return error;     
    }
  }


 export const  logOut = async(cookies: any) =>{
    try{    
     const rez = await $host.post("api/user/logout", cookies)
     return rez
    }
    catch(e){
      return e
    }
  }



class AuthService{
  
  async login(email: string, password: string) {
    try {
       $host.post<AuthType>("api/user/signin", {email,});
      
     
    } catch (error: any) {
    
    
      return error;
     
    }
  }
 
 async singUp(values:AuthType){
  try{
   const response = await $host.post<AuthType>("api/user/signup",values)
   const data = response.data;

   console.log(data) 
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
    console.log(error.config);
  }
    
  } 

 async check(){
  try{
   const response = await $host.post<AuthType>("api/user/signup")
   const data = response.data;

   console.log(data) 
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
    console.log(error.config);
  }
    
  } 

  async logOut(cookies: any){
    try{
    
     const rez = await $host.post("api/user/logout", cookies)
     return rez
    }
    catch(e){
      return e
    }
  }
  
}
// eslint-disable-next-line import/no-anonymous-default-export
// export default new  Auth()



