const { runWithErrorHandling, validateToken } = require('../../utils')
const { estimates: {createEstimate} } = require('../../logic')
const logger = require('../../logger')(module)

function createEstimateHandler(req, res){
    
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)
        
        const { body: { estimateNumber, customer, terms, estimateDate, products, totalAmount } } = req
        
        await createEstimate(companyId, estimateNumber, customer, terms, estimateDate, products, totalAmount)

        res.status(201).send()
    
    }, res, logger)
}

module.exports = createEstimateHandler