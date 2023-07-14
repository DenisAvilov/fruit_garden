const path = require('path');
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const {User, UserFio, Contact, Social} = require('../models/models')
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

       UserFio.create(
          {name: '', lastName: '', img: '', userId: user.id},        
        );
       Contact.create(
          {phone: null, userId: user.id},        
        );
       Social.create(
          {fb: null, instagram: null, telegram: null, userId: user.id},        
        );

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
     return {tokens, user: userDto}
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
    const users = User.findOne({where:{id}})    
    return users
  } 
  // First Middle Last &&  FIO
  async fmlUp(name, lastName, img, id){   
  let fileName;
  if (img) {
    fileName = uuid.v4() + ".jpeg";
   await img.img.mv(path.resolve(__dirname, '..', 'static/users',  fileName));
  }

  const updateData = { name, lastName };
  if (fileName) {
    updateData.img = fileName;
  }

  const updatedUser = await UserFio.update(
    updateData,
    { where: { userId: id } }
  );
  return updatedUser;
  } 

  async fmlAll(limit, offset){
    const usersFml = await UserFio.findAndCountAll({limit, offset})
    return usersFml
  }

  async fml(id){
    const userFml = await UserFio.findOne({where: {id}})
    return userFml
  }
 // Contact Phone
  async contactUp(phone, id){     
  const updatedUser = await Contact.update(
    phone,
    { where: { userId: id } }
  );
  return updatedUser;
  } 

  async contactAll(limit, offset){
    const usersFml = await Contact.findAndCountAll({limit, offset})
    return usersFml
  }

  async contact(id){
    const userFml = await Contact.findOne({where: {id}})
    return userFml
  }
  // Social 
  async socialUp(fb, instagram, telegram, id){   
  const updatedSocial = await Social.update(
    {fb, instagram, telegram},
    { where: { userId: id } }
  );
  return updatedSocial;
  } 

  async socialAll(limit, offset){
    const socialAll = await Social.findAndCountAll({limit, offset})
    return socialAll
  }

  async social(id){
    const userFml = await Social.findOne({where: {id}})
    return userFml
  }
}
module.exports = new UserService()