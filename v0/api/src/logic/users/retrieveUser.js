const { User } = require('../../models')
const {Types: {ObjectId}} = require('mongoose')
const { NotFoundError, FormatError } = require('errors')

function retrieveUser(userId){
    if(!(ObjectId.isValid(userId))) throw new FormatError('User is not valid')

    return (async () => {
        const foundUser = await User.findById(userId).populate('company').lean() 

        if (!foundUser) throw new NotFoundError('User not found')

        foundUser.id = foundUser._id
        delete foundUser._id
        delete foundUser.password
        delete foundUser.__v

        foundUser.company.id = foundUser.company._id
        delete foundUser.company._id
        delete foundUser.company.__v
    
        
    
        return foundUser
    })()
}

module.exports = retrieveUser