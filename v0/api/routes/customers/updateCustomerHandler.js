const { runWithErrorHandling } = require('../../utils')
const logger = require('../../logger')(module)
const { customers: { updateCustomer } } = require('../../logic')
const { validateToken } = require('../../utils')

function updateCustomerHandler(req, res){
    
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)
        
        const { body: {name, contactName, email, phone, website, legalId, billingAddress, shippingAddress, payTerms} } = req

        const customerId = req.params.customerId
        
        await updateCustomer(customerId, companyId ,{name, contactName, email, phone, website, legalId, billingAddress, shippingAddress, payTerms})

        res.status(204).send()

        logger.info(`Customer: ${customerId} updated succesfully`)
    }, res, logger)
}

module.exports = updateCustomerHandler