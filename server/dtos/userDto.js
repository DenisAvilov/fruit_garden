module.exports = class UserDto{
  userId
  email  
  role
  isActivated
  tel
  constructor(model){
    this.userId = model.id
    this.email = model.email
    this.isActivated = model.isActivated
    this.tel = model.tel
    this.role = model.role
  }
}