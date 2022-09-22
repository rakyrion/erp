const { runWithErrorHandling } = require('../../utils')
const logger = require('../../logger')(module)
const { invoices: { updateInvoice } } = require('../../logic')
const { validateToken } = require('../../utils')

function updateInvoiceHandler(req, res) {

    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)

        const { body: { invoiceNumber, customer, terms, invoiceDate, dueDate, products, balance, totalAmount, status } } = req

        const invoiceId = req.params.invoiceId

        await updateInvoice(invoiceId, companyId, { invoiceNumber, customer, terms, invoiceDate, dueDate, products, balance, totalAmount, status })

        res.status(204).send()

        logger.info(`Invoice: ${invoiceId} updated succesfully`)
    }, res, logger)
}

module.exports = updateInvoiceHandler