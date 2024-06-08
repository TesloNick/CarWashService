const Router = require('express')
const carController = require('../controllers/carController')
const router = new Router()

router.get('/', carController.getAllCars)
router.get('/:userId', carController.getAllUserCar)

module.exports = router