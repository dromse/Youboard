const Router = require('express')
const { body } = require('express-validator')

const userController = require('../controllers/userController')

const router = new Router()

router.post(
    '/signup',
    userController.signup,
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

router.get('activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/getAll', userController.getAll)

// router.get('/auth', authMiddleware, userController.check())

module.exports = router
