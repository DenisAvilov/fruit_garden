const ApiError = require('../error/ApiError')
const refreshService = require('../service/refresh-service')

class RefreshController { 
  async refresh(req, res, next) {
      try{  
      
        const {refreshToken} = req.cookies      
        const  userData = await refreshService.refresh(refreshToken)      
        res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true})      
        return res.json(userData)
      }
      catch(e){          
        return next(ApiError.badRequest("Ви не авторізовані", e ))
      }
    }
}

module.exports = new RefreshController()