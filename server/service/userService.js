const bcrypt = require('bcrypt')
const uuid = require('uuid')

const ApiError = require('../errors/ApiError')
const { User } = require('../models/models')
const UserDto = require('../dtos/userDto')
const mailService = require('./mailService')
const tokenService = require('./tokenService')

class UserController {
    async signup(email, password) {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.BadRequest('Email is already registered.')
        }

        const hashPassword = await bcrypt.hash(password, 3)

        const activationLink = uuid.v4()

        const user = await User.create({
            email,
            password: hashPassword,
            activationLink,
        })

        console.log(process.env.API_URL)

        await mailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/user/activate/${activationLink}`,
        )

        const userDto = new UserDto(user)

        const tokens = tokenService.generateTokens({ ...userDto })

        return {
            ...tokens,
            user: userDto,
        }
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return next(ApiError.BadRequest('Email was not found.'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.BadRequest('Password does not match.'))
        }

        const token = generateToken(user.id, user.email)
        return token
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async activate(activationLink) {
        const user = await User.findOne({
            where: { activationLink: activationLink },
        })

        if (!user) {
            throw ApiError.BadRequest('Non correct activation link.')
        }

        user.isActivated = true

        await user.save()
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }

        const user = await User.findByPk(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async getAll() {
        const users = await User.findAll()
        return users
    }
}

module.exports = new UserController()
