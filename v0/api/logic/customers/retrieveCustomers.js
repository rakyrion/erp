const { Customer, Company } = require('../../models')
const {Types: {ObjectId}} = require('mongoose')
const { NotFoundError, FormatError } = require('errors')

function retrieveCustomers(companyId){
    if(!(ObjectId.isValid(companyId))) throw new FormatError('Company is not valid')

    return (async () => {
        const foundCompany = await Company.findById(companyId).lean() 

        if (!foundCompany) throw new NotFoundError('Company not found')

        const customers = await Customer.find({company: companyId}).lean()
        
        customers.forEach(customer => {
            customer.id = customer._id
            delete customer._id
            delete customer.__v
        })
        return customers
    })()
}

module.exports = retrieveCustomers