const { runWithErrorHandling, validateToken } = require('../../utils')
const { customers: {retrieveACustomer} } = require('../../logic')
const logger = require('../../logger')(module)

function retrieveACustomerHandler(req, res) {
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)
        const customerId = req.params.customerId

        return (async () => {
        
            const customer = await retrieveACustomer(companyId, customerId)
            
            res.json(customer)

            logger.info(`Company: ${companyId} retrieved customer ${customerId} succesfully`)
        })()
    }, res, logger)
}

module.exports = retrieveACustomerHandler