const Router = require('express')
const tableContoller = require('../controllers/tableContoller')

const router = new Router()

// return all tables available for user.
// router.post('/', tableContoller.getAll)
// router.post('/:id', tableContoller.getOne)

module.exports = router
