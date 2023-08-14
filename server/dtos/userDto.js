module.exports = class UserDto{
  userId
  email  
  role
  isActivated  
  constructor(model){
    this.userId = model.id
    this.email = model.email
    this.isActivated = model.isActivated   
    this.role = model.role
  }
}