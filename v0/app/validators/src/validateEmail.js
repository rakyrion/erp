const {mailRegex} = require('./constants')
const {RegexError, FormatError} = require('errors')

function validateEmail(email){
    if (typeof email !== 'string') throw new TypeError('email is not a string')
    if (email.trim().length === 0) throw new FormatError('email is empty or blank')
    if (!mailRegex.test(email)) throw new RegexError('Email is not valid')
}

module.exports = validateEmail