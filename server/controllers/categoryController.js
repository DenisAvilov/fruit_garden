const ApiError = require("../error/ApiError")
const categoryService = require('../service/category-service')
const subCategory = require('../service/subCategory-service')
class TypeController {
  async addCategoryController(req, res, next){
    try{
      const {name} = req.body
      const category = await categoryService.create(name)
      return res.json(category)
    }
    catch(e){
      return next(ApiError.badRequest("Категория товару не добавлена"), e)
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
        const categoryId = req.params.id;    
    // Перевірте, чи існують підкатегорії для цієї категорії
        const subcategoriesExist = await subCategory.checkSubcategoriesExist(categoryId);
        if (subcategoriesExist) {
          return res.status(400).json({ error: 'Неможливо видалити категорію, оскільки в ній є підкатегорії. Видалить всі підкатегорії або перенесить підкатегорії до іншої категорі та повторіть спробу!' });
        }
         const category = await categoryService.delete(req.params.id);
        
        if (category === null) {
          // Якщо категорія не знайдена, кидаємо помилку
          return res.status(404).json({ error: 'Категорія не знайдена в БД' });
        }
    
    return res.json(`Категорія ${category.name} видалена`,);
      }
      catch(e){
        return next(ApiError.badRequest("Категорія не видалена"))
      }
    }

    
}

module.exports = new TypeController()