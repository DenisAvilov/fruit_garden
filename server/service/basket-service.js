const {Basket} = require('../models/models')
class BasketService{
  async create(name){
    const basket = await Basket.create({name})
    return basket
  }
  async getall(){
    const baskets = await Basket.findAll()
    return baskets
  }
  async update(id, name){
    const basket = await Basket.findByPk(id)
    const update =  basket.update({name})
    return update
  }
  async delete(id){
    const basket = await Basket.findByPk(id)
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        await basket.destroy()
    return basket
  }
}
module.exports = new BasketService()