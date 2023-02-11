const {ProductType} = require('../models/models')  //Добовляем в базу данных объекты
const ApiError = require('../error/ApiError')
class TypeController {
  async addTypeController(req,res){
    const {name} = req.body
    const type = await ProductType.create({name})
    return res.json(type)
  } 
  async getTypeController(req,res){
      const type = await ProductType.findAll()
    res.json(type)
  }
}

module.exports = new TypeController()