const { runWithErrorHandling, validateToken } = require('../../utils')
const { customers: {createCustomer} } = require('../../logic')
const logger = require('../../logger')(module)

function createCustomerHandler(req, res){
    runWithErrorHandling(async () => {
        const {userId, companyId } = await validateToken(req)
        const { body: { name, contactName, email, phone, website, legalId, billingAddress, shippingAddress, payterms} } = req

        await createCustomer(userId, companyId, name, {contactName, email, phone, website, legalId, billingAddress, shippingAddress, payterms})

        res.status(201).send()
    
    }, res, logger)
}

module.exports = createCustomerHandler