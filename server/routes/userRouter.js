const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const {body} = require('express-validator')

router.post('/signup',
       body('email').isEmail(),
       body('password').isLength({min:3, max:32}),
       userController.registration
       )
router.post('/signin',
       body('email').isEmail(),
       body('password').isLength({min:3, max:32}),
       userController.login
       ) 
router.get('/activate/:link',  userController.activate)
router.get('/check',authMiddleware, userController.check)
router.get('/refresh', userController.refresh)
router.delete('/delete/:id([0-9]+)',authMiddleware, userController.delete)
router.post('/logout', userController.logout)


router.get('/getall',authMiddleware, userController.getall)
router.get('/getuser/:id([0-9]+)',authMiddleware, userController.getUser)
router.put('/update/:id([0-9]+)', authMiddleware, (req, res) => res.status(200).send('Обновление пользователя'))

module.exports = router