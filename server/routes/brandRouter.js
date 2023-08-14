const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
router.post('/create',brandController.createBrand)
router.get('/getall',brandController.getAll) //Список всех брендов
router.get('/getOneBrand',brandController.getOneBrand) //Список всех брендов
router.put('/update/:id([0-9]+)', brandController.update)
router.delete('/delete/:id([0-9]+)', brandController.delete)

router.get('/getone/:id([0-9]+)', (req, res) => res.status(200).send('Получение одного бренда'))
module.exports = router
