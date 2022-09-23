const { User, Company } = require('../../models')
const { NotFoundError, AuthError, ForbiddenError } = require('errors')

function linkGoogleAccount(userId, companyId, password, googleId) {
    // TODO INPUT VALIDATIONS (ENSURE HAS COMPANY ID...)
    return (async() => {
        const foundUser = await User.findById(userId)
 
        if(!foundUser) throw new NotFoundError('Error retrieving user')
        
        if(foundUser.password !== password) throw new AuthError('Password wrong')

        if(foundUser.company.toString() !== companyId) throw new Error('Company ID does not match on that user')

        if(foundUser.googleId) throw new ForbiddenError(`User has already linked his account with google, please unlink first`)

        foundUser.googleId = googleId

        await foundUser.save()

    })()
}

module.exports = linkGoogleAccount