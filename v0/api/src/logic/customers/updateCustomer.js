const { Customer } = require('../../models')
const { NotFoundError, FormatError, DuplicityError } = require('errors')
const { Types: { ObjectId } } = require('mongoose')

function updateCustomer(customerId, companyId, { name, contactName, email, phone, website, legalId, billingAddress, shippingAddress, payTerms }) {
    //TODO VALIDATE INPUTS
  
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company ID is not valid')
    if (!(ObjectId.isValid(customerId))) throw new FormatError('Customer ID is not valid')

    return (async () => {

        const customer = await Customer.findOne({ _id: customerId, company: companyId })
        if (!customer) throw new NotFoundError(`Customer with ID ${customerId} not found or not belong to company with ID ${companyId}`)

        const found = await Customer.findOne({ _id: { $not: { $eq : customerId } }, name, company: companyId })

        if (found && found.name === name)
            throw new DuplicityError(`There's already a Customer named ${name}`)

        await Customer.updateOne({ _id: customerId }, { name, contactName, email, phone, website, legalId, billingAddress, shippingAddress, payTerms })
    })()
}

module.exports = updateCustomer