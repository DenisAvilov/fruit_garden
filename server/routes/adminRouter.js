const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const {body} = require('express-validator')



router.get('/', roleMiddleware('ADMIN'), adminController.admin)
// router.get('/check', userController.check)
router.delete('/delete/:id([0-9]+)',roleMiddleware('ADMIN'), userController.delete)
router.get('/getall', roleMiddleware('ADMIN'), userController.getall)
router.get('/getuser/:id([0-9]+)',authMiddleware, userController.getUser)


module.exports = router