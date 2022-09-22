const { User } = require('../../models')
const { NotFoundError } = require('errors')

function authenticateGoogleUser(googleId) {
    // TODO INPUT VALIDATIONS (ENSURE HAS COMPANY ID...)
    return (async() => {
        const foundUser = await User.findOne({ googleId })
 
        if(!foundUser) throw new NotFoundError('Account not registered with google')
        
        return { userId : foundUser.id, companyId : foundUser.company }

    })()
}

module.exports = authenticateGoogleUser