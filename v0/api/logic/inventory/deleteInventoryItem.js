const { User, InventoryItem, Company } = require('../../models')
const { NotFoundError, FormatError, ForbiddenError } = require('errors')
const { Types: { ObjectId }} = require('mongoose')


function deleteInventoryItem(userId, companyId, itemId){
    //TODO Validate INPUTS
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company ID is not valid');
    if (!(ObjectId.isValid(userId))) throw new FormatError('User ID is not valid');


    return (async() => {
        const company = await Company.findById(companyId)

        if(!company) throw new NotFoundError(`Company with id ${companyId} not found`)

        const user = await User.findById(userId)

        if(!user) throw new NotFoundError(`User with id ${userId} not found`)

        if(user.role === 'accountant') throw new ForbiddenError(`User ${userId} does not have permission to delete items`)

        await InventoryItem.findByIdAndDelete(itemId)
        
    })()
}

module.exports = deleteInventoryItem