
import axios, { AxiosRequestConfig } from "axios";


 const $host =  axios.create({
  //куки ципляються автоматически к каждому запросу 
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const $authHost = axios.create({
  // withCredentials: true, 
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

// export default axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     "Content-type": "application/json"
//   }
// });

// eslint-disable-next-line import/no-anonymous-default-export
export  {
  $host,
  $authHost
}