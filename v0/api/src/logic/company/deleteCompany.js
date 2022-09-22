const { Company, User, InventoryItem, Invoice, Estimate, Customer } = require('../../models')
const { NotFoundError, AuthError, FormatError } = require('errors')
const { Types: { ObjectId }} = require('mongoose')
const { validatePassword } = require('validators')

function deleteCompany(userId, companyId, password, confirmPassword){
    //TODO Validate INPUTS
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company ID is not valid');
    if (!(ObjectId.isValid(userId))) throw new FormatError('User ID is not valid');
    validatePassword(password)
    validatePassword(confirmPassword)
    if(password !== confirmPassword) throw new FormatError('Password and confirm password are not the same')

    return (async() => {
        const company = await Company.findById(companyId)

        if(!company) throw new NotFoundError(`Company with id ${companyId} not found`)

        if(company.admin.toString() !== userId) throw new AuthError(`User with id ${userId} is not the admin of the company`)

        const user = await User.findById(userId)

        if(user.password !== password) throw new AuthError('Wrong credentials')

        await Promise.all([
            User.deleteMany({ company: companyId }),
            InventoryItem.deleteMany({ company: companyId }),
            Invoice.deleteMany({ company: companyId }),
            Estimate.deleteMany({ company: companyId }),
            Customer.deleteMany({ company: companyId }),
            await company.delete()
        ])
        
    })()
}

module.exports = deleteCompany