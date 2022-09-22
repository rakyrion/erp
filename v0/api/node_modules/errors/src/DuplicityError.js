class DuplicityError extends Error{
    constructor(message){
        super(message)
        this.name = DuplicityError.name
    }
}

module.exports = DuplicityError