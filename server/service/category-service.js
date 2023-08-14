const {Category} = require('../models/models') 
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
    const category = await Category.findByPk(id)
     if (!category) {
            throw new Error('Категория не найдена в БД')
        } 
     category.destroy()
    return category
  }
}
module.exports = new CategoryService()