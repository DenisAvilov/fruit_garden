// const e = require('express')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt') // установить bcrypt для хештрования паролей, и сам токен jsonwebtoken 
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
//Кешируем данние 1 параметрам передаеться прилоад, 2 передаеться секретний ключ, 3 время жизни токена
const generateJWT = (id, email, role)=>{
       return jwt.sign(
        {id, email, role},
         process.env.SECRET_KEY,
         {expiresIn: '24h'}
         )
      }
class UserController {
   async registration(req, res, next){
      const {email, password, role} = req.body //Роль нигде не создаеться но она должна бить 
      //Про валидацию полей смотреть урок про валидацию в jsonwebtoken,  роли пользователей
     
      if(!email || !password){
        return next(ApiError.badRequest('Не коректный емаил или пароль'))
      }
      const candidate = await User.findOne({where: {email}})
      if(candidate){
        return next(ApiError.badRequest(`Користувачь ${candidate} вже існує`))
      }
      const hasCandidate = await bcrypt.hash(password, 5)
      const user = await User.create({email, role, password: hasCandidate})
      
      //Создаем карзину для пользователя
      const basket = await Basket.create({userId: user.id})      
      const token = generateJWT(user.id, email, user.role)
         return res.json({token})
    }
   async login(req, res, next){
      const {email, password} = req.body    
      const user = await User.findOne({where: {email}})
      if(!user){
        return next(ApiError.internal('Користувачь з таким им\'ям не найден'))
      }
      // Сравниваем пароли
     const compareSync = bcrypt.compareSync(password, user.password)
     if(!compareSync){
      return next(ApiError.internal('Перевірь вірність написання паролю'))
     }
     const token = generateJWT(user.id, email, user.role)
     return res.json({token})
    }
   async check(req, res, next){
      const {id} = req.query
      if(!id){
        return next(ApiError.badRequest("Нет индинтификатора пользователя"))
      }
      res.json(id)
    }

}

module.exports = new UserController()