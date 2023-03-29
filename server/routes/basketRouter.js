const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/',basketController.createBasket)
// router.get('/',typeController.getTypeController)


module.exports = router