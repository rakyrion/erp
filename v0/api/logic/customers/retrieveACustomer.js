const { Customer, Company } = require('../../models')
const { Types: { ObjectId } } = require('mongoose')
const { NotFoundError, FormatError } = require('errors')

function retrieveACustomer(companyId, customerId) {
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company is not valid')
    if (!(ObjectId.isValid(customerId))) throw new FormatError('Customer is not valid')

    return (async () => {
        const foundCompany = await Company.findById(companyId).lean()

        if (!foundCompany) throw new NotFoundError('Company not found')

        const customer = await Customer.findOne({ company: companyId, _id: customerId }).lean()

        customer.id = customer._id
        delete customer._id
        delete customer.__v

        return customer
    })()
}

module.exports = retrieveACustomer