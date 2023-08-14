const Router = require('express')
const router = new Router()
const smackController = require('../controllers/smack')
const roleMiddleware = require('../middleware/roleMiddleware')
router.post('/create',smackController.create)
router.get('/get', smackController.get)
router.get('/get/:id([0-9]+)', smackController.getId)
router.get('/get/check', smackController.getSmacksByIds);
// router.get('/getall',roleMiddleware('ADMIN') smackController.getAll) //Список всех брендов
// router.put('/update/:id([0-9]+)', smackController.update)
router.delete('/delete/:id([0-9]+)', smackController.delete)


module.exports = router
