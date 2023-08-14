class ApiError extends Error{  
  status;
  errors;

  constructor(status,message, errors = []){
    super(message)
    this.status = status
    this.message = message
    this.errors = errors

  }

 static UnauthorizedError(){
   return new ApiError(401, "Користувачь не авторізован")
 }
 static badRequest(mes, errors = []){
   return new ApiError(404, mes, errors)
 }

 static internal(message, errors = []){
   return new ApiError(500, message, errors)
 }
 // не предусмотренная ошибка
 static forbidden(message, errors = []){
   return  new ApiError(403, message, errors)
 }
  //статические функции єто функции которіе можно візівать без создания об'єкта


}

module.exports = ApiError