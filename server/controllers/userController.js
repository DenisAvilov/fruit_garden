// const e = require('express')
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt') // установить bcrypt для хештрования паролей, и сам токен jsonwebtoken 
const jwt = require('jsonwebtoken')
const userService = require('../service/user-service')
const tokenService = require('../service/token-service')
const {User, Basket, Token} = require('../models/models')
const {validationResult} = require('express-validator')
const limitPages = require('../controllers/helpers/helpers')
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
    try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        return next(ApiError.badRequest("Помилка при валідації, перевірте email або password", errors.array()))
      }
        const {email, password, role} = req.body //Роль нигде не создаеться но она должна бить   
        const userData =  await userService.registration(email, password, role)
      // httpOnly: true - флаг что бі куку нельзя біло получать, изменять из браузера. при работе с https нужно добавить флаг secur (секюр)
       res.cookie( 'refreshToken',userData.tokens.refreshToken,{maxAge: 30*24*60*1000, httpOnly: true})   
       return res.json(userData)
    }
    catch(e){
      return next(e)
    }
    }
   async login(req, res, next){
     try{
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        throw ApiError.badRequest("Помилка при валідації, перевірте email або password", errors.array())
      }
      const {email, password} = req.body   
      const userData = await userService.login(email, password)
      res.cookie( 'refreshToken',userData.refreshToken,{maxAge: 30*24*60*1000, httpOnly: true})  
      return res.json(userData)
     }
     catch(e){
      return next(e)
     }
    }

   async activate(req, res, next) {       
      try{
        const {link} = req.params
        await userService.activateLink(link, next)
       return res.redirect(process.env.CLIENT_URL)
      }
      catch(e){
        return next(ApiError.badRequest("Не вірна ссилка активации"))
      }
  } 
  
  // async refresh(req, res, next) {
  //     try{}
  //     catch(e){
  //       return next(ApiError.badRequest("Refresh Token not good"))
  //     }
  // }
  async logout(req, res, next) {
      try{
        const {refreshToken} = req.cookies
        await userService.logout(refreshToken)
        res.clearCookie('refreshToken') 
        return res.json(200)
      }
      catch(e){
        return next(ApiError.badRequest("LogOut no good", e))
      }
  }
  async check(req, res, next){
      try{
         const token = await tokenService.saveToken(req.user.userId, req.cookies.refreshToken)  
         res.json(token)
      }
      catch(e){
        return next(ApiError.badRequest("Сесія скінчилась, авторизуйтесь", e))
      }
    }
    
    async getall(req, res, next) {

       try{
         const {limit, limitPage} = req.query
         const {limits, limitPages} = await limitPages.limitPage(limit, limitPage)
         const users = await userService.getall(limits, limitPages)
         return res.json(users)
       }
       catch(e){
         return next(ApiError.badRequest("Помилка при валидації всіх корестувачів", e))
       }
    }
    async getUser(req, res, next) {
       try{        
         const {id} = req.params        
         if(!id){
          return next(ApiError.badRequest("Нема айді корестувача"))
         }
         const user = await userService.getUser(id)        
         return res.json(user)
       }
       catch(e){
         return next(ApiError.badRequest("Помилка при валидації всіх корестувачів", e))
       }
    }
    // async update(id, data) {
    //     const user = await UserMapping.findByPk(id)
    //     if (!user) {
    //         throw new Error('Пользователь не найден в БД')
    //     }
    //     const {
    //         email = user.email,
    //         password = user.password,
    //         role = user.role
    //     } = data
    //     await user.update({email, password, role})
    //     return user
    // }

  
    async delete(req, res, next) {
      try{
         const {id} = req.params   
         const {refreshToken}  = req.cookies    
         const result = await userService.userDelete(id, refreshToken)
         res.clearCookie('refreshToken')
        return res.json(result)
      }
      catch(e){
        return next(ApiError.badRequest('Корестувачь не видален', e))
      }
    }

}

module.exports = new UserController()