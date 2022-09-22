const { User } = require('../../models')
const { NotFoundError, FormatError, ForbiddenError } = require('errors')
const { Types: { ObjectId }} = require('mongoose')


function deleteUser(adminId, companyId, userId){
    //TODO Validate INPUTS
    
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company ID is not valid');
    if (!(ObjectId.isValid(userId))) throw new FormatError('User ID is not valid');
    if (!(ObjectId.isValid(adminId))) throw new FormatError('Admin ID is not valid');


    return (async() => {

        const user = await User.findById(userId)

        if(!user) throw new NotFoundError(`User with id ${userId} not found`)

        if(user.company.toString() !== companyId) throw new ForbiddenError(`User ${userId} does not belong to Company ${companyId}`)

        const admin = await User.findOne({_id: adminId, company: companyId})

        if(!admin) throw new NotFoundError(`Admin with id${adminId} not found or does not belong to company ${companyId}`)

        await user.delete()
        
    })()
}

module.exports = deleteUser