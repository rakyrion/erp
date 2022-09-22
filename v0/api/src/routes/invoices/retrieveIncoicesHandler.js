const { runWithErrorHandling, validateToken } = require('../../utils')
const { invoices: {retrieveInvoices} } = require('../../logic')
const logger = require('../../logger')(module)

function retrieveInvoicesHandler(req, res) {
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)

        return (async () => {
        
            const invoices = await retrieveInvoices(companyId)
            
            res.json(invoices)

            logger.info(`Company: ${companyId} retrieved invoices succesfully`)
        })()
    }, res, logger)
}

module.exports = retrieveInvoicesHandler