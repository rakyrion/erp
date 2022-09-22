const { Company } = require('../../models')
const { NotFoundError } = require('errors')
const { Types: { ObjectId } } = require('mongoose')

function updateCompanyDetails(userId, companyId, {name, legalName, legalId, telephone, companyEmail, customerFacingEmail, postalAddress, physicalAddress, sector, website}){
    //TODO Validate INPUTS
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company ID is not valid');
    if (!(ObjectId.isValid(userId))) throw new FormatError('User ID is not valid');


    return (async() => {
        const company = await Company.findById(companyId)

        if(!company) throw new NotFoundError(`Company with id ${companyId} not found`)

        const userFound = company.users.find(user => {
            return user.toString() === userId
        })

        if(!userFound) throw new NotFoundError(`User with id ${userId} not found or does not belong to company with id ${companyId}`)

        await Company.updateOne({_id: companyId}, {name, legalName, legalId, telephone, companyEmail, customerFacingEmail, postalAddress, physicalAddress, sector, website})
    })()
}

module.exports = updateCompanyDetails
