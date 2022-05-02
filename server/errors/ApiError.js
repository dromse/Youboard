module.exports = class ApiError extends Error {
    status
    errors

    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.message = message
    }
    static UnauthorizedError() {
        return new ApiError(401, 'The user is not authorized.')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }
}
