const { User } = require('../../models')
const { NotFoundError, AuthError } = require('errors')
const { validateEmail, validatePassword } = require('validators')

function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    return (async() => {
        const foundUser = await User.findOne({ email })

        if(!foundUser) throw new NotFoundError('Email and/or password wrong')

        if(foundUser.password !== password) throw new AuthError('Email and/or password wrong')
        
        return { userId : foundUser.id, companyId : foundUser.company }

    })()
}

module.exports = authenticateUser