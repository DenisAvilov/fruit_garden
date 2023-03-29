const Router = require('express')
const router = new Router()

const brandRouter = require('./brandRouter')
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')
const basketProductRouter = require('./basketProductRouter')
 
router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/basket', basketProductRouter)


module.exports = router