class SystemError extends Error{
    constructor(message){
        super(message)
        this.name = SystemError.name
    }
}

module.exports = SystemError