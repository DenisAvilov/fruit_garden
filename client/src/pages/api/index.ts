import { UserResponseType } from "@/types/user";
import axios from "axios";

const createAxiosInstance = () => {
  return axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-type": "application/json"
    }
  });
};

const $host = createAxiosInstance();
const $authHost = createAxiosInstance();

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

const refreshToken = async () => {
  try {
    const user = await axios.get<UserResponseType>(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, { withCredentials: true });
    localStorage.setItem('token', user.data.tokens.accessToken);
    return user.data.tokens.accessToken;
  } catch (e) {
    console.log('КОРИСТУВАЧ НЕ АВТОРИЗОВАН');
    throw e;
  }
};

$authHost.interceptors.response.use(
  (config: any) => config,
  async (error: any) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
       const accessToken = await refreshToken();
        originalRequest.headers.authorization = `Bearer ${accessToken}`;
        return $authHost.request(originalRequest);       
    }
    throw error;
  }
);

const checkRefresh = async () => {
  try {
    console.log('user')
    const user = await axios.get<UserResponseType>(`http://localhost:5000/api/refresh`, { withCredentials: true });
    // const user = await axios.get<UserResponseType>(`${process.env.NEXT_PUBLIC_API_URL}/refresh`, { withCredentials: true });    
   console.log('user', user)
    const accessToken = user.data.tokens.accessToken;
    localStorage.setItem('token', accessToken);
    return user.data.user;
  } catch (e) {   
    console.error('Error in checkRefresh:', e); // Вивід помилки в консоль
    return null;
  }
};

export {
  $host,
  $authHost,
  checkRefresh
};


