const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const subcategory = require('../controllers/subCategoryController')


router.post('/create', categoryController.addCategoryController)
router.get('/getall', categoryController.getCategoryController)
router.put('/update/:id([0-9]+)', categoryController.updateCategory)
router.delete('/delete/:id([0-9]+)', categoryController.deleteCategory)
router.get('/getone/:id([0-9]+)', (req, res) => res.status(200).send('Получение одной категории'))

router.get('/', subcategory.getSubCategory);
router.post('/add-subcategory', subcategory.addSubcategory);
router.put('/update-subcategory/:id([0-9]+)', subcategory.updateSubCategory);
router.put('/move-subcategory-to-new-category', subcategory.moveSubcategoriesToNewCategory);
module.exports = router