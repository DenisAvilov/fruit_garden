class ApiError extends Error{  
  constructor(status,message){
    super()
    this.status = status
    this.message = message
  }

 static badRequest(mes){
   return new ApiError(404, mes)
 }

 static internal(message){
   return new ApiError(500, message)
 }
 // не предусмотренная ошибка
 static forbidden(message){
   return  new ApiError(403, message)
 }
  //статические функции єто функции которіе можно візівать без создания об'єкта


}

module.exports = ApiError