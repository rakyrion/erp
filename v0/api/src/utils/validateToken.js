const { AuthError } = require('errors')
const { verify } = require('jsonwebtoken')
const { validateText } = require('validators')
const { Blacklist } = require('../models')
const {env : { JWT_SECRET}} = process
function validateToken(req) {

    const { headers: { authorization } } = req

    validateText(authorization, 'authorization')

    const token = authorization.substring(7)
    const payload = verify(token, JWT_SECRET)

    return (async () => {
        
        const blackListed = await Blacklist.findOne({ token })
        if (blackListed) throw new AuthError('Token is blackListed')

        const userId = payload.sub.userId
        const companyId = payload.sub.companyId

        return { userId, token, companyId }
    })()
}

module.exports = validateToken