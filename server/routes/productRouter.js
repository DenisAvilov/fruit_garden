const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
router.get('/', productController.getALLProduct)
router.get('/:id', productController.getOne)
router.post('/create', productController.createProduct)
router.put('/:id([0-9]+)', productController.update)
router.delete('/delete/:id([0-9]+)', productController.deleteProduct)


module.exports = router    