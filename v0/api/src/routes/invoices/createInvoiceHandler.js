const { runWithErrorHandling, validateToken } = require('../../utils')
const { invoices: {createInvoice} } = require('../../logic')
const logger = require('../../logger')(module)

function createInvoiceHandler(req, res){
    
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)
        
        const { body: { invoiceNumber, customer, terms, invoiceDate, dueDate, products, totalAmount} } = req
        
        await createInvoice(companyId,{ invoiceNumber, customer, terms, invoiceDate, dueDate, products, totalAmount})

        res.status(201).send()
    
    }, res, logger)
}

module.exports = createInvoiceHandler