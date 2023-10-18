const tokenService = require('./token-service')
const {User} = require('../models/models')
const ApiError = require('../error/ApiError')
const UserDto = require('../dtos/userDto')

class RefreshService{
   async refresh(refreshToken){
    if(!refreshToken){
      throw ApiError.UnauthorizedError('В куках нема refreshToken')
    }   
   
    const userData = tokenService.validateRefreshToken(refreshToken)    
    const tokenFromDb = await tokenService.findToken(refreshToken) 
    if(!userData || !tokenFromDb){     
       throw ApiError.UnauthorizedError()
    }        
    const user = await User.findByPk(userData.userId)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.userId, tokens.refreshToken)       
    return {tokens, user: userDto}
  }
}

module.exports = new RefreshService()