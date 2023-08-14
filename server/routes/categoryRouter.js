const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

router.post('/create', categoryController.addCategoryController)
router.get('/getall', categoryController.getCategoryController)
router.put('/update/:id([0-9]+)', categoryController.updateCategory)
router.delete('/delete/:id([0-9]+)', categoryController.deleteCategory)
router.get('/getone/:id([0-9]+)', (req, res) => res.status(200).send('Получение одной категории'))

module.exports = router