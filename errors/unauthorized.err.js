class UnauthorizedError extends Error{
    constructor(message, action) {
        super(message);
        this.statusCode = 401;
        this.action = action;
    }
}

module.exports = UnauthorizedError;