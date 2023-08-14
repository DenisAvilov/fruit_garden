const ApiError = require('./../error/ApiError')
const tokenService = require('../service/token-service')
module.exports = async function (req,res,next){
  if(req.method === 'OPTIONS'){
     next()
  }
  
  try{    
    const accessToken = req.headers.authorization.split(' ')[1]//Bearer accessToken   
    if(!accessToken){     
     return next(ApiError.UnauthorizedError())     
    }         
    const userData = tokenService.validateAccessToken(accessToken)  
    if(!userData){     
     return next(ApiError.UnauthorizedError('Користувачь не авторизован проверка'))     
    }     
    req.user = userData   
    next()
  }
  catch(e){
    
    res.status(401).json({message:"Користувачь не авторизован проверка"})
  }
}
