const ApiError = require("../error/ApiError")
const categoryService = require('../service/category-service')
class TypeController {
  async addCategoryController(req, res, next){
    try{
      const {name} = req.body
      const category = await categoryService.create(name)
      return res.json(category)
    }
    catch(e){
      return next(ApiError.badRequest("Категория товару не добавлена"))
    }
  } 
  async getCategoryController(req,res, next){
      try{
        const category = await categoryService.findAll()
       return res.json(category)
      }
      catch(e){
        return next(ApiError.badRequest('Категорія не добавлена', e))
      }
  } 
  async updateCategory(req, res, next){
      try{      
       const category = await categoryService.update(req.params.id, req.body.name)
       return res.json(category)
      }
      catch(e){
        return next(ApiError.badRequest('Категорія не добавлена', e))
      }
  }
  async deleteCategory(req, res, next) {
      try{       
        const category = await categoryService.delete(req.params.id)              
        return res.json(category)
      }
      catch(e){
        return next(ApiError.badRequest("Категорич не видалена"))
      }
    }
}

module.exports = new TypeController()