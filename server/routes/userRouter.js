const Router = require('express')
const userController = require('../controllers/userController')

const router = new Router()

router.post('/signup', userController.signUp)
router.post('/login', userController.logIn)

// router.get('/auth', authMiddleware, userController.check())

module.exports = router 
