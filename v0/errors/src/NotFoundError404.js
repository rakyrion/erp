const NotFoundError = require('./NotFoundError')

class NotFoundError404 extends NotFoundError{
    constructor(message){
        super(message)
        this.name = NotFoundError404.name
    }
}

module.exports = NotFoundError404