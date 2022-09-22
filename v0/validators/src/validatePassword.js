const {requiredPass} = require('./constants')
const {RegexError, FormatError} = require('errors')

function validatePassword(pass, explain = 'password'){
    if (typeof pass !== 'string') throw new TypeError(`${explain} is not a string`)
    if (pass.trim().length === 0) throw new FormatError(`${explain} is empty or blank`)
    if (pass.length < 8 || pass.length > 15) throw new FormatError(`${explain} length is less than 8 characters or more than 15`)
    if(!requiredPass.test(pass)) throw new RegexError(`\n${explain} does not meet the requirements: \n- Between 8 and 15 characters\n- At least 1 capital letter\n- At least 1 lowercase letter\n- At least 1 symbol`)
    
    else return
}

module.exports = validatePassword
