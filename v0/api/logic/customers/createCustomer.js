const { User, Company, Customer } = require('../../models')
const { NotFoundError, FormatError, ForbiddenError, DuplicityError } = require('errors')
const { Types: { ObjectId } } = require('mongoose')

function createCustomer(userId, company, name, {contactName, email, phone, website, legalId, billingAddress, shippingAddress, payTerms}) {
    
    if (!(ObjectId.isValid(company))) throw new FormatError('Company ID is not valid');

    return (async () => {
        
        const companyFound = await Company.findById(company)

        if (!companyFound) throw new NotFoundError(`Company with ID ${company} not found`)

        const user = await User.findOne({_id : userId, company})
        if (!user) throw new NotFoundError(`Customer with ID ${userId} not found`)
        if (user.role === 'accountant') throw new ForbiddenError(`User ${userId} does not have permission to create Customers`)

        const customer = await Customer.findOne({company, name})
        if(customer) throw new DuplicityError(`There's already a customer created with name ${name}`)

        await Customer.create({company , name, contactName, email, phone, website, legalId, billingAddress, shippingAddress, payTerms })
        
    })()
}

module.exports = createCustomer