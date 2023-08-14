const {BasketProduct, Product, User, Basket} = require('../models/models')
class BasketProductController{
 async  createBasketProduct(req,res){
    
    // const {id, userID} = req.query
    const {productId, userID} = req.body
console.log('basketProductController', productId, userID)
    var basket = await Basket.findOne({where: {user_id:userID}})

   basket = basket ? basket : Basket.create({userId: userID})

    const rez = await Product.findOne({
        where: {id: productId},          
   })
    const basketProduct = await BasketProduct.create({
      where: {basket , rez}
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