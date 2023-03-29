const jwt = require('jsonwebtoken')
const {Token} = require('../models/models')
class TokenService{
   generateTokens(preload){
    const accessToken = jwt.sign(preload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30min'})
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
}
module.exports = new TokenService()