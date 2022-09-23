const { User } = require('../../models')
const {Types: {ObjectId}} = require('mongoose')
const { NotFoundError, FormatError } = require('errors')
const { validateEmail } = require('validators')

function updateUserEmail(userId, email){
    if(!(ObjectId.isValid(userId))) throw new FormatError('User is not valid')
    validateEmail(email)

    return (async () => {
        const foundUser = await User.findById(userId)

        if (!foundUser) throw new NotFoundError('User not found')

        foundUser.email = email

        await foundUser.save()
    
        return
    })()
}

module.exports = updateUserEmail