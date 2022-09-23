const { User } = require('../../models')
const {Types: {ObjectId}} = require('mongoose')
const { FormatError, AuthError } = require('errors')
const { validatePassword } = require('validators')

function updateUserPassword(userId, oldPassword, newPassword, confirmNewPassword){
    if(!(ObjectId.isValid(userId))) throw new FormatError('User is not valid')
    validatePassword(oldPassword)
    validatePassword(newPassword)
    validatePassword(confirmNewPassword)
    if(newPassword !== confirmNewPassword) throw new AuthError('New password and confirm new password are not the same')
    
    return (async () => {
        const foundUser = await User.findById(userId)

        if (!foundUser || foundUser.password !== oldPassword) throw new AuthError(`User ${userId} does not exists or credentials are wrong`)

        foundUser.password = newPassword

        await foundUser.save()
    
        return
    })()
}

module.exports = updateUserPassword