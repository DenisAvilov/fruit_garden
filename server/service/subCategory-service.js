const {Subcategory,  Category} = require('../models/models') 

class SubCategory{
  async addSubcategoryService(id, name) {
    const category = await Category.findByPk(id);
  if (!category) {
    throw new Error('Категорія не знайдена в БД');
  }
  const subcategory = await Subcategory.create({name});
  await category.addSubcategory(subcategory);
  return category;
}
 
  

  async findAll(){    
    const subCategory = await Category.findAll({      
         include: Subcategory, 
        });      
    return subCategory
  }

async findById(id) {
  try {
    // Знайдіть субкатегорію за id
    const subCategory = await Subcategory.findByPk(id);

    return subCategory;
  } catch (error) {
    throw new Error('Помилка при пошуку субкатегорії за id');
  }
}


async update(id, name) {
  try {
    // Знайдіть субкатегорію за id
    const subCategory = await Subcategory.findByPk(id);

    if (!subCategory) {
      throw new Error('Субкатегорія не знайдена в БД');
    }

    // Оновіть назву субкатегорії
    const updatedSubCategory = await subCategory.update({ name });

    return updatedSubCategory;
  } catch (error) {
    throw new Error('Помилка при оновленні субкатегорії');
  }
}


  async  checkSubcategoriesExist(categoryId) {
    try {
      // Знайдіть всі підкатегорії, які належать до заданої категорії (categoryId)
      const subcategories = await Subcategory.findAll({ where: { categoryId } });

      // Перевірте, чи є підкатегорії для цієї категорії
      return subcategories.length > 0;
    } catch (error) {
      // Обробіть помилку, якщо вона виникла під час запиту до бази даних
      throw new Error('Помилка при перевірці наявності підкатегорій.');
    }
  }

  async moveSubcategoriesToNewCategory(oldCategoryId, newCategoryId, oldSubcategoryIds = []) {
  try {
     
    // Якщо oldSubcategoryIds не передається або пустий, виконуємо перенесення всіх підкатегорій
    if (oldSubcategoryIds.length === 0) {
      const subcategoriesToMove = await Subcategory.findAll({
        where: { category_id: oldCategoryId },
      });

      // Перенесення всіх підкатегорій до нової категорії
      for (const subcategory of subcategoriesToMove) {
        subcategory.categoryId = newCategoryId;
        await subcategory.save();
      }
    } else {
      // Інакше, переносимо обрані підкатегорії
      const subcategoriesToMove = await Subcategory.findAll({
        where: {
          id: oldSubcategoryIds,
        },
      });

      // Перенесення обраних підкатегорій до нової категорії
      for (const subcategory of subcategoriesToMove) {
        subcategory.categoryId = newCategoryId;
        await subcategory.save();
      }
    }

    return 'Підкатегорії успішно перенесені до нової категорії.';
  } catch (error) {
    throw new Error('Помилка при перенесенні підкатегорій.');
  }
}

}
module.exports = new SubCategory()