const ApiError = require('../error/ApiError')

module.exports = function(err,req,res,next){
  if( err instanceof ApiError ){
    console.log({message: err.message, errors: err.errors})
  return  res.status(err.status).json({message: err.message, errors: err.errors})
  } 
  return res.status(500).json({message:"Не передбачувана помилка.", message: err.message})
}