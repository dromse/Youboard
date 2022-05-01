const Router = require('express')

const userRouter = require('./userRouter')
const tableRouter = require('./tableRouter')

const router = new Router()

router.use('/user', userRouter)
router.use('/table', tableRouter)

export default router
