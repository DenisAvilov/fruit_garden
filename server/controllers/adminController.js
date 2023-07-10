const ApiError = require('../error/ApiError')
const tokenService = require('../service/token-service')

class AdminController { 
  async admin(req, res, next){   
      try{       
        
      
      }
      catch(e){
        return next(ApiError.badRequest("Сесія скінчилась, авторизуйтесь", e))
      }
    }    
 

}

module.exports = new AdminController()