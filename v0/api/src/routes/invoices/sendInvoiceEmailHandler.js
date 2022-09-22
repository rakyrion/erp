const { runWithErrorHandling, validateToken } = require('../../utils')
const { sendInvoiceEmail } = require('../../logic')
const logger = require('../../logger')(module)

function sendInvoiceEmailHandler(req, res){
    
    runWithErrorHandling(async () => {
        const { companyId, userId } = await validateToken(req)
        
        const invoiceId = req.params.invoiceId
        const { body: { receiver } } = req
        await sendInvoiceEmail(userId, companyId, invoiceId, receiver)

        res.status(204).send()
        
    }, res, logger)
}

module.exports = sendInvoiceEmailHandler