const { FormatError } = require('errors')

function validateText(text, explain = 'Text'){
    if (typeof text !== 'string') throw new TypeError(`${explain} is not a string`)
    if (text.trim().length === 0) throw new FormatError(`${explain} is empty or blank`)
}

module.exports = validateText