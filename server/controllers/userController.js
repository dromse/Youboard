const ApiError = require('../errors/ApiError')
const bcrypt = require('bcrypt')
const { User } = require('../models/models')
const jwt = require('jsonwebtoken')

const generateToken = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: '24h',
    })
}

class UserController {
    async signUp(req, res, next) {
        const { email, password, role } = req.body

        if (!email || !password) {
            return next(
                ApiError.badRequest('Email or password is not correct.'),
            )
        }

        const candidate = await User.fineOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('Email is already registered.'))
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({
            email,
            password: hashPassword,
            role,
        })

        const token = generateToken(user.id, user.email, user.role)

        return res.json({ token })
    }

    async logIn(req, res, next) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user) {
            return next(
                ApiError.internalError('User with this name was not found.'),
            )
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internalError('Password does not match.'))
        }

        const token = generateToken(user.id, user.email, user.role)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateToken(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }
}

module.exports = new UserController()
