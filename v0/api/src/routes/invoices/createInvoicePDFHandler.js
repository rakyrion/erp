const { runWithErrorHandling, validateToken } = require('../../utils')
const { createPDF } = require('../../logic')
const logger = require('../../logger')(module)

function createPDFHandler(req, res){
    
    runWithErrorHandling(async () => {
        const { companyId, userId } = await validateToken(req)
        
        const invoiceId = req.params.invoiceId

        const { pdfOutputStream, pdfFileName } = await createPDF(userId, companyId, invoiceId)
       
        res.contentType("application/pdf")
        pdfOutputStream.pipe(res)
        
    }, res, logger)
}

module.exports = createPDFHandler