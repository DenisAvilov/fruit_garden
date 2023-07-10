const jwt = require('jsonwebtoken')
const {Token} = require('../models/models')
const ApiError = require('../error/ApiError')
class TokenService{
   generateTokens(preload){
    const accessToken = jwt.sign(preload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '15m'})
    const refreshToken = jwt.sign(preload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'})
  
    return{
      accessToken,
      refreshToken
    }
}
  async saveToken(userId, refreshToken){
    const tokenData = await Token.findOne({where: {userId}})    
    if(tokenData){
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }     
    const token = await Token.create({userId, refreshToken})      
    return token  
  }

  async removeToken(refreshToken){     
     const tokenData = await Token.destroy({where:{refreshToken}})
     return tokenData
  }

   validateAccessToken(token){
    try{    
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)   
      if(!userData){      
        return ApiError.UnauthorizedError({massage: 'validateAccessToken ne proshol validacu'})
      }     
      return userData
    }
    catch(e){     
      return null
    }
  }
  validateRefreshToken(token){
    try{      
      const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
      return userData
    }
    catch(e){
    return null
    }
  }

   async findToken(refreshToken){
     const tokenData = await Token.findOne({where:{refreshToken}})
     return tokenData
  }

}
module.exports = new TokenService()