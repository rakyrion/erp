class UnknownError extends Error{
    constructor(message){
        super(message)
        this.name = UnknownError.name
    }
}

module.exports = UnknownError