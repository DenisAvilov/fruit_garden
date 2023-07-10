const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const {body} = require('express-validator')



router.get('/', roleMiddleware('ADMIN'), adminController.admin)
router.get('/check',authMiddleware, userController.check)
router.delete('/delete/:id([0-9]+)',authMiddleware, userController.delete)
router.get('/getall',authMiddleware, userController.getall)
router.get('/getuser/:id([0-9]+)',authMiddleware, userController.getUser)
router.put('/update/:id([0-9]+)', authMiddleware, (req, res) => res.status(200).send('Обновление пользователя'))

module.exports = router