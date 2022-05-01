const Router = require('express')
const userController = require('../controllers/userController')

const router = new Router()

router.post('/signup', userController.signUp)
router.post('/login', userController.login)

router.get('/auth', authMiddleware, userController.check())

module.exports = roter
