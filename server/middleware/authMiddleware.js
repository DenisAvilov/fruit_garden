// Здесь проверяем токен и проверяем его на валидность, если токен не валидній оправляем ошибку на то пользователь не авторизован
const jwt = require('jsonwebtoken')
module.exports = function (req,res,next){
  if(req.method === 'OPTIONS'){
     next()
  }
  try{    
    const token = req.headers.authorization.split(' ')[1]//Bearer TOKEN
        
    if(!token){
     return res.status(401).json({message:"Користувачь не авторизован нема токена"})
    }
    // проверка на валидность токена
      const decoder =  jwt.verify(token,  process.env.JWT_REFRESH_TOKEN) 
    // добовляем в юзеру из запроса данные о пользователе и во всех функциях этот юзер будит доступен     
    req.user = decoder
    // Вункціею НЕКС визиваемо в цепочке наступниц миделваєр
    next()
  }
  catch(e){
    res.status(401).json({message:"Користувачь не авторизован проверка"})
  }
}
