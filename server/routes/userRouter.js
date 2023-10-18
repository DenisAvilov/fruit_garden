const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const {body} = require('express-validator')

router.post('/sign-up',
       body('email').isEmail(),
       body('password').isLength({min:3, max:32}),
       userController.registration
       )
router.post('/sign-in',
       body('email').isEmail(),
       body('password').isLength({min:3, max:32}),
       userController.login
       ) 
router.get('/activate/:link',  userController.activate)
// router.get('/check',authMiddleware, userController.check)
// router.get('/check',  userController.check)
router.delete('/delete/:id([0-9]+)', roleMiddleware('ADMIN'), userController.delete)
router.post('/logout', userController.logout)


router.get('/getall', roleMiddleware('ADMIN'), userController.getall)
router.get('/get-user/:id([0-9]+)', authMiddleware, userController.getUser)
// First Middle Last
router.put('/fml-up/:id([0-9]+)', authMiddleware, userController.fmlUp)
router.get('/fml-all', roleMiddleware('ADMIN'), userController.fmlAll)
router.get('/fml/:id([0-9]+)', authMiddleware, userController.fml)
// Contact
router.put('/contact-up/:id([0-9]+)', authMiddleware, userController.contactUp)
router.get('/contact-all', roleMiddleware('ADMIN'), userController.contactAll)
router.get('/contact/:id([0-9]+)', authMiddleware, userController.contact)
// Social
router.put('/social-up/:id([0-9]+)', authMiddleware, userController.socialUp)
router.get('/social-all', roleMiddleware('ADMIN'), userController.socialAll)
router.get('/social/:id([0-9]+)', authMiddleware, userController.social)
module.exports = router