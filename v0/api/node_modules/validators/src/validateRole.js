const { FormatError } = require('errors')

function validateRole(role, explain = 'role'){
    if(typeof role !== 'string') throw new TypeError(`${explain} is not a string`)
    if(role.trim().length === 0) throw new FormatError(`${explain} is empty or blank`)
    if(role !== 'admin' && role !== 'accountant' && role !== 'employee') throw new FormatError(`${role} is not an allowed role`)
}

module.exports = validateRole