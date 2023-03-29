module.exports = class UserDto{
  userId
  email
  activationLink
  role
  constructor(model){
    this.userId = model.id
    this.email = model.email
    this.activationLink = model.activationLink
    this.role = model.role

  }
}