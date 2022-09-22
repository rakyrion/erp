class RegexError extends Error{
    constructor(message){
        super(message)
        this.name = RegexError.name
    }
}

module.exports = RegexError