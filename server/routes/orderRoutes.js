const Router = require('express')
const orderController = require('../controllers/orderController')
const router = new Router()

router.get('/', orderController.getAllOrders)
router.get('/:userId', orderController.getAllOrdersByUser)
router.post('/', orderController.createOrder)

module.exports = router