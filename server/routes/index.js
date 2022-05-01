const Router = require('express')

const tableRouter = require('./tableRouter')
const userRouter = require('./userRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/table', tableRouter)

module.exports = router
