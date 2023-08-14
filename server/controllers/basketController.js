const {Basket} = require('../models/models')
class BasketController{
 async  createBasket(req,res){
    const {userId} = req.body
    const brand = await Basket.create({userId})
    return res.json(basket)
  }
 async getAll(req, res){
   //  const brands = await Brand.findAll()
   //  return res.json(brands)
 }

}

module.exports = new BasketController()