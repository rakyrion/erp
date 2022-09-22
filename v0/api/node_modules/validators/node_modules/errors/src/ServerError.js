class ServerError extends Error {
    constructor(message) {
        super(message)

        this.name = ServerError.name
    }
}

module.exports = ServerError