const Router = require('express')
const router = new Router()
const serviceController = require('../controllers/serviceController')

router.get('/', serviceController.getAllServices)
router.get('/:carClass', serviceController.getServicesByClass)

module.exports = router