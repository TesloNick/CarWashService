const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const serviceRoutes = require('./serviceRoutes')
const carRoutes = require('./carRoutes')
const orderRoutes = require('./orderRoutes')

router.use('/user', userRouter)
router.use('/service', serviceRoutes)
router.use('/car', carRoutes)
router.use('/order', orderRoutes)

module.exports = router