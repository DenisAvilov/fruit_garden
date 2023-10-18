const ApiError = require("../error/ApiError")
const subcategoryService  = require('../service/subCategory-service')
const {Category, Subcategory} = require('./../models/models')

class TypeController {
  
  async getSubCategory(req,res, next){
      try{
        const category = await subcategoryService.findAll()
       return res.json(category)
      }
      catch(e){
        return next(ApiError.badRequest('Категорії ще нема', e))
      }
  } 

  async  addSubcategory(req, res, next) {
    try {
      const { id, name } = req.body;    
      const subcategory = await subcategoryService.addSubcategoryService(id, name);
      return res.json(subcategory);           
    } catch (e) {
      return next(ApiError.badRequest("Підкатегорія не додана до категорії"), e);
    }
  }

  async updateSubCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Перевірка, чи існує субкатегорія з вказаним id
    const subCategory = await subcategoryService.findById(id);

    if (!subCategory) {
      return next(ApiError.notFound('Субкатегорія не знайдена'));
    }

    // Оновлення назви субкатегорії
    const updatedSubCategory = await subcategoryService.update(id, name);

    return res.json(updatedSubCategory);
  } catch (e) {
    return next(ApiError.badRequest('Помилка при оновленні субкатегорії', e));
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

   async moveSubcategoriesToNewCategory(req, res, next) {
    try {
      const { oldCategoryId, newCategoryId, oldSubcategoryIds  } = req.body;
      console.log(oldCategoryId, newCategoryId)
      // Виклик функції для перенесення підкатегорій
      const result = await subcategoryService.moveSubcategoriesToNewCategory(oldCategoryId, newCategoryId, oldSubcategoryIds );      
      return res.json({ message: result });
    } catch (error) {
      return next(ApiError.badRequest('Помилка при перенесенні підкатегорій', error));
    }
  }
    
}

module.exports = new TypeController()