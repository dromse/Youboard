import Router from 'router'

import userController from '../controllers/userController'
import tableContoller from '../controllers/tableController'

const router = new Router()

router.use('/user', userController)
router.use('/table', tableContoller)

export default router
