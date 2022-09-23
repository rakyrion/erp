const { User, Customer, Estimate, Invoice } = require('../../models')
const { NotFoundError, FormatError, ForbiddenError, BadRequestError } = require('errors')
const { Types: { ObjectId }} = require('mongoose')


function deleteCustomer(userId, company, customerId){
    if (!(ObjectId.isValid(company))) throw new FormatError('Company ID is not valid')
    if (!(ObjectId.isValid(userId))) throw new FormatError('User ID is not valid')
    if (!(ObjectId.isValid(customerId))) throw new FormatError('User ID is not valid')


    return (async() => {
        
        const customer = await Customer.findOne({_id : customerId, company})
        if(!customer) throw new NotFoundError(`Customer ${customerId} not found in Company with ID ${company}`)
        
        const customerEstimates = await Estimate.findOne({company, 'customer.refId' : customerId})
        if(customerEstimates) throw new BadRequestError(`Customer ${customer.name} have existing estimates. Please first delete all estimates`)

        const customerInvoices = await Invoice.findOne({company, 'customer.refId': customerId})
        if(customerInvoices) throw new BadRequestError(`Customer ${customer.name} have existing invoices. Please first delete all invoices`)

        const user = await User.findById(userId)

        if(!user) throw new NotFoundError(`User with id ${userId} not found`)

        if(user.role === 'accountant') throw new ForbiddenError(`User ${userId} does not have permission to delete customers`)

        await customer.delete()
        
    })()
}

module.exports = deleteCustomer