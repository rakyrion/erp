const { runWithErrorHandling } = require('../../utils')
const { invoices: {deleteInvoice} } = require('../../logic')
const logger = require('../../logger')(module)
const { validateToken } = require('../../utils')

function deleteInvoiceHandler(req, res){
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)

        const invoiceId = req.params.invoiceId

        await deleteInvoice(companyId, invoiceId)

        res.status(200).send()
    
    }, res, logger)
}

module.exports = deleteInvoiceHandler