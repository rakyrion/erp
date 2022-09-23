const { runWithErrorHandling, validateToken } = require('../../utils')
const { customers: {retrieveCustomers} } = require('../../logic')
const logger = require('../../logger')(module)

function retrieveCustomersHandler(req, res) {
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)

        return (async () => {
        
            const customers = await retrieveCustomers(companyId)
            
            res.json(customers)

            logger.info(`Company: ${companyId} retrieved customers succesfully`)
        })()
    }, res, logger)
}

module.exports = retrieveCustomersHandler