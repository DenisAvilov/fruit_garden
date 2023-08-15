
import { UserResponseType } from "@/types/user";
import axios from "axios";


 const $host =  axios.create({
  //куки ципляються автоматически к каждому запросу 
  withCredentials: true, 
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const $authHost = axios.create({
  withCredentials: true, 
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

$authHost.interceptors.response.use(
  (config: any)=>{return config},
 async (error: any) => {
  const originalRequest = error.config
  console.log('error.response.status', error.response.status)
    if(error.response.status = 401 && error.config && !error.config._isRetry){
      originalRequest._isRetry = true
       try{
         const user = await axios.get<UserResponseType>( `${process.env.NEXT_PUBLIC_API_URL}/refresh`,  {withCredentials: true})    
        localStorage.setItem('token', user.data.tokens.accessToken)  
        return  $authHost.request(originalRequest)
       }
       catch(e){
        console.log('КОРИСТУВАЧЬ НЕ АВТОРІЗОВАН')
       }
      }
      throw error;
  }
  )

 export const checkRefresh = async () => {  
  try{
    const user = await axios.get<UserResponseType>( `${process.env.NEXT_PUBLIC_API_URL}/refresh`,  {withCredentials: true})     
    console.log('uthRefresh = async () =>', user)
    localStorage.setItem('token', user.data.tokens.accessToken)     
    return user.data.user
     
  }
  catch(e){
    return console.log('error api index ===>  ', e)
  }
 } 


export  {
  $host,
  $authHost
}