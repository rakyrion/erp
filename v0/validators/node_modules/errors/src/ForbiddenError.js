class ForbiddenError extends Error{
    constructor(message){
        super(message)
        this.name = ForbiddenError.name
    }
}

module.exports = ForbiddenError