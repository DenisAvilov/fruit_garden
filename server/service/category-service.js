const {Category, Subcategory} = require('../models/models') 
class CategoryService{
  async create(name){    
    const category = await Category.create({name})
    return category
  }
  async findAll(){    
    const category = await Category.findAll()
    return category
  }
  async update(id, name){    
    const category = await Category.findByPk(id)
    const updateCategory = category.update({name})
    return updateCategory
  }

  async delete(id){ 
    try{
        const category = await Category.findByPk(id)   
        // Видаліть категорію, оскільки вона не має підкатегорій   
        console.log('category', category)
     if (category == null) {
              return null;
        } 
         await category.destroy();
     return category;
    }
    catch(e){
           throw new Error('Помилка при видаленні категорії.');
    }
  }

  
  
}
module.exports = new CategoryService()