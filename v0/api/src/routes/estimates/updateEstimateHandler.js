const { runWithErrorHandling } = require('../../utils')
const logger = require('../../logger')(module)
const { estimates: { updateEstimate } } = require('../../logic')
const { validateToken } = require('../../utils')

function updateEstimateHandler(req, res){
    
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)
        
        const { body: {estimateNumber, customer, terms, estimateDate, products, totalAmount, status} } = req

        const estimateId = req.params.estimateId
        
        await updateEstimate(estimateId, companyId ,{estimateNumber, customer, terms, estimateDate, products, totalAmount, status})

        res.status(204).send()

        logger.info(`Estimate: ${estimateId} updated succesfully`)
    }, res, logger)
}

module.exports = updateEstimateHandler