function validateCallback(callback){
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')
}

module.exports = validateCallback