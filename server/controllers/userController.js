const { validationResult } = require('express-validator')

const ApiError = require('../errors/ApiError')
const userService = require('../service/userService')

const maxAgeTime = 30 * 24 * 60 * 60 * 1000

class UserController {
    async signup(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('validation failed.', errors.array()),
                )
            }

            const { email, password } = req.body

            const userData = await userService.signup(email, password)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: maxAgeTime,
                httpOnly: true,
            })

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)

            return res.cookie('refreshToken', userData.refreshToken, {
                maxAge: maxAgeTime,
                httpOnly: true,
            })
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await userService.getAll()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
    
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: maxAgeTime,
            })

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()
