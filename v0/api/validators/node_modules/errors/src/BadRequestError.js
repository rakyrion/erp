class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.name = BadRequestError.name
    }
}

module.exports = BadRequestError