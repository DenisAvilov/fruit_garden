const ApiError = require('../error/ApiError')
const userService = require('../service/user-service')
const tokenService = require('../service/token-service')
const {validationResult} = require('express-validator')
const limitPages = require('../controllers/helpers/helpers')
//Кешируем данние 1 параметрам передаеться прилоад, 2 передаеться секретний ключ, 3 время жизни токена
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
      res.cookie( 'refreshToken', userData.tokens.refreshToken,{maxAge: 30*24*60*1000, httpOnly: true})
      return res.json(userData)
     }
     catch(e){
      return next(e)
     }
    }
  async activate(req, res, next) {       
      try{
        const {link} = req.params
        console.log('link', link)
        await userService.activateLink(link, next)
       return res.redirect(process.env.CLIENT_URL_LENDING)
      }
      catch(e){
        return next(ApiError.badRequest("Не вірна ссилка активации"))
      }
    }  
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
         
         const rez = await limitPages.limitPage(limit, limitPage)
         console.log('rez', rez)
         const users = await userService.getall(rez.limit, rez.offset)
        //  const users = await userService.getall()
         return res.json(users)
       }
       catch(e){
         return next(ApiError.badRequest("Помилка при валидації всіх корестувачів", e))
       }
    }
  async getUser(req, res, next) {
       try{    
        
        //  const user = await User.findOne({
        //     where: { id: userId },
        //     include: [
        //       { model: Contact },
        //       { model: Social }
        //     ]
        //   });

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
  // Работа С ИМЕНЕМ ФАМИЛИЕЙ и ФОТОГРАФИЕЙ
  async fmlUp(req, res, next) {
        try{
        // const errors = validationResult(req)
        // if(!errors.isEmpty()){
        //   return next(ApiError.badRequest("Помилка при валідації, перевірте правильність вода данних", errors.array()))
        // }
          const {name, lastName} = req.body  
          const id = req.params.id
          const img = req.files                
          const userData =  await userService.fmlUp(name, lastName, img, id)
          console.log('userData userController', userData)
        return res.json(userData)
      }
      catch(e){
        return next(e)
      }
      } 
  async fmlAll(req, res, next) {
    try{ 
      const {limit, limitPage} = req.query         
          const rez = await limitPages.limitPage(limit, limitPage)
          console.log('rez', rez)
          const users = await userService.fmlAll(rez.limit, rez.offset)         
          return res.json(users)
    }
    catch(e){
      return next(e)
    }
  }   
  async fml(req, res, next) {
   try{ 
    const id = req.params.id
    if(!id){
          return next(ApiError.badRequest("Іидентифікатор корестувача не знайден"))
         }
    if(req.user.role === 'USER' && id != req.user.userId){
       console.log(req.user.userId)
      return next(ApiError.badRequest("Іидентифікатор корестувача не ваш"))
    }

        const users = await userService.fml(id)         
         return res.json(users)
   }
   catch(e){
    return next(e)
   }
 }   
  // Работа С ТЕЛЕФОНАМИ

  async contactUp(req, res, next) {
        try{
        // const errors = validationResult(req)
        // if(!errors.isEmpty()){
        //   return next(ApiError.badRequest("Помилка при валідації, перевірте правильність вода данних", errors.array()))
        // }
          const {phone} = req.body  
          const id = req.params.id                         
          const userPhone =  await userService.contactUp(phone, id)
          console.log('userData userController', userPhone)
        return res.json(userPhone)
      }
      catch(e){
        return next(e)
      }
      } 
  async contactAll(req, res, next) {
    try{ 
      const {limit, limitPage} = req.query         
          const rez = await limitPages.limitPage(limit, limitPage)         
          const userPhone = await userService.contactAll(rez.limit, rez.offset)         
          return res.json(userPhone)
    }
    catch(e){
      return next(e)
    }
  }   
  async contact(req, res, next) {
   try{ 
    const id = req.params.id
    if(!id){
          return next(ApiError.badRequest("Іидентифікатор корестувача не знайден"))
         }
    if(req.user.role === 'USER' && id != req.user.userId){
       console.log(req.user.userId)
      return next(ApiError.badRequest("Іидентифікатор корестувача не ваш"))
    }

        const users = await userService.contact(id)         
         return res.json(users)
   }
   catch(e){
    return next(e)
   }
 } 

 // Social 
  async socialUp(req, res, next) {
        try{
        // const errors = validationResult(req)
        // if(!errors.isEmpty()){
        //   return next(ApiError.badRequest("Помилка при валідації, перевірте правильність вода данних", errors.array()))
        // }
          const {fb, instagram, telegram} = req.body  
          const id = req.params.id                       
          const userData =  await userService.socialUp(fb, instagram, telegram, id)
          console.log('userData userController', userData)
        return res.json(userData)
      }
      catch(e){
        return next(e)
      }
      } 
  async socialAll(req, res, next) {
    try{ 
      const {limit, limitPage} = req.query         
          const rez = await limitPages.limitPage(limit, limitPage)          
          const social = await userService.socialAll(rez.limit, rez.offset)         
          return res.json(social)
    }
    catch(e){
      return next(e)
    }
  }   
  async social(req, res, next) {
   try{ 
    const id = req.params.id
    if(!id){
          return next(ApiError.badRequest("Іидентифікатор корестувача не знайден"))
         }
    if(req.user.role === 'USER' && id != req.user.userId){       
      return next(ApiError.badRequest("Іидентифікатор корестувача не ваш"))
    }

        const social = await userService.social(id)         
         return res.json(social)
   }
   catch(e){
    return next(e)
   }
 }   
}

module.exports = new UserController()