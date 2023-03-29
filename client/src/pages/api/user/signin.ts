import http from '../http-common'
import { Auth } from '../../../types/userType'

class AuthIn{
  
 async authIn(values:Auth){
  try{
   const response = await http.post<Auth>("/user/login",values)
   const data = response.data;
    return data;
  }
  catch(error: any){
     if (error.response) {
      // Обработка ошибки от сервера
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
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
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new  AuthIn()