const jwt = require('jsonwebtoken')
const Token = require('../models/models')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '15m',
        })

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: '30d',
            },
        )

        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: { userId: userId } })
        console.log(tokenData)

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await Token.create({ where: userId, refreshToken })
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.findOne({
            where: { refreshToken: refreshToken },
        })
        tokenData.destroy()
        return tokenData
    }

    async findToken(token) {
        const tokenData = await Token.findOne({ where: {refreshToken: token }})
        return tokenData
    }
}

module.exports = new TokenService()
