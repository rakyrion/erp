const {nameRegex} = require('./constants')

function validateName(name){
    if (nameRegex.test(name) === false) throw new Error('\nName does not meet the requirements:\n- Between 1 and 20 characters\n- Exclusively letters\n- No Blanks')
}

module.exports = validateName