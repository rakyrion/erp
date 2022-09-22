class FormatError extends Error{
    constructor(message){
        super(message)
        this.name = FormatError.name
    }
}

module.exports = FormatError