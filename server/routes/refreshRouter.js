const Router = require('express')
const router = new Router()
const refreshController = require('../controllers/refreshController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', refreshController.refresh)

module.exports = router