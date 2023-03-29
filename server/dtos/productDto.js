module.exports = class UserDto{
  name
  price
  brandId
  categoryId
  value
  constructor(model){
    this.name = model.name
    this.price = model.price
    this.brandId = model.brandId
    this.categoryId = model.categoryId
    this.value = model.value

  }
}