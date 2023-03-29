const {BasketProduct, Product} = require('../models/models')
class BasketProductController{
 async  createBasketProduct(req,res){
    const {id} = req.query
    const rez = await Product.findOne({
        where: {id},          
   })
    const basketProduct = await BasketProduct.create({
      where: {rez}
    })
    return res.json(basketProduct)
  }
 async getBasketProductController(req, res){
   const {id} = req.query
    // const brand = await Basket.create({userId})
    const rez = await Product.findAll({
        where: {id:1},          
   })
    
    return res.json(rez)
 }

}

module.exports = new BasketProductController()