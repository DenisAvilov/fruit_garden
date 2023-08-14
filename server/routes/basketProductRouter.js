const Router = require('express')
const router = new Router()
const basketProductRouter = require('../controllers/basketProductController')

router.post('/',basketProductRouter.createBasketProduct)
router.get('/product',basketProductRouter.getBasketProductController)


module.exports = router