const mailService = require('./mail-service')
const tokenService = require('./token-service')
const {User} = require('../models/models')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const ApiError = require('../error/ApiError')
const UserDto = require('../dtos/userDto')
const limitPage = require('../controllers/helpers/helpers')

class UserService{
  async registration(email, password, role){    
    if(!email || !password){
        throw ApiError.badRequest('Все поля повині бути заповнені')
      }
      const candidate = await User.findOne({where: {email}})
      if(candidate){
        throw ApiError.badRequest(`Користувачь ${candidate.email} вже існує`)
      }
      const activationLink =  uuid.v4()
      const hasCandidate = await bcrypt.hash(password, 5)
      const user = await User.create({
        email,
        role,
        password: hasCandidate, 
        activationLink
      })
      // await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
      const userDto = new UserDto(user)// userId, email, activationLink, role
      //Создаем карзину для пользователя
      // const basket = await Basket.create({userId: user.id})      
      const tokens = tokenService.generateTokens({...userDto})//разворачиваем новій новій обїект с помощью оператора спред
      await tokenService.saveToken(userDto.userId, tokens.refreshToken)      
      return {tokens, user: userDto}

  }
  async login(email, password){
    if(!email || !password){
        throw ApiError.badRequest('Все поля повині бути заповнені')
      }
    const user = await User.findOne({where: {email}})
      if(!user){
        throw ApiError.internal('Користувачь з таким им\'ям не найден')
      }
      // Сравниваем пароли
     const compareSync = await bcrypt.compareSync(password, user.password)
     if(!compareSync){
      throw ApiError.internal('Не коректний пароль')
     }
     const userDto = new UserDto(user)
     const tokens = tokenService.generateTokens({...userDto})
     await tokenService.saveToken(userDto.userId, tokens.refreshToken)      
     return {...tokens, user: userDto}
  }
  async activateLink(activateLink, next){
        const user = await  User.findOne({activateLink})
        if (!user){
          return next(ApiError.badRequest("Силка не активна"))
        }
        user.isActivated = true
        await user.save()
      }  
  async logout(refreshToken){
    const token = await tokenService.removeToken(refreshToken)
    return token
  }   
  async userDelete(id, refreshToken){    
    const user = await User.findOne({where: {id}})    
    if (!user) {
            throw new Error('Корестувачь не знайден')
        }
       await user.destroy({where:{id}}) 
       await tokenService.removeToken(refreshToken)       
       return user
  }
  
  async getall(limit, offset){
   
    const users = await User.findAndCountAll({ limit, offset})    
    return users
  }  
  async getUser(id){
    console.log('get user id' + id)
    const users = User.findOne({where:{id}})
    console.log(users)
    return users
  } 

  async refresh(refreshToken){
    if(!refreshToken){
      throw ApiError.UnauthorizedError()
    }    
    const userData = await tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken) 

    if(!userData || !tokenFromDb){
      console.log('1',userData , '2',tokenFromDb)  
       throw ApiError.UnauthorizedError()
    }
        
    const user = await User.findByPk(userData.userId)
    const userDto = new UserDto(user)
     const tokens = tokenService.generateTokens({...userDto})
     await tokenService.saveToken(userDto.userId, tokens.refreshToken)      
     return {...tokens, user: userDto}
  }
}
module.exports = new UserService()