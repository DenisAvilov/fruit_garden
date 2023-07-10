const Router = require('express')
const router = new Router()

const brandRouter = require('./brandRouter')
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')
const basketProductRouter = require('./basketProductRouter')
const refreshRouter = require('./refreshRouter')
 

router.use('/user', userRouter)
router.use('/admin', adminRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/basket', basketProductRouter)
router.use('/refresh', refreshRouter)
module.exports = router