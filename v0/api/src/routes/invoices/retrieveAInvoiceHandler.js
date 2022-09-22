const { runWithErrorHandling, validateToken } = require('../../utils')
const { invoices: {retrieveAInvoice} } = require('../../logic')
const logger = require('../../logger')(module)

function retrieveAInvoiceHandler(req, res) {
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)
        const invoiceId = req.params.invoiceId

        return (async () => {
        
            const customer = await retrieveAInvoice(companyId, invoiceId)
            
            res.json(customer)

            logger.info(`Company: ${companyId} retrieved invoice ${invoiceId} succesfully`)
        })()
    }, res, logger)
}

module.exports = retrieveAInvoiceHandler