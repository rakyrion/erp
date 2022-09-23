const { runWithErrorHandling, validateToken } = require('../../utils')
const { estimates: {retrieveAEstimate} } = require('../../logic')
const logger = require('../../logger')(module)

function retrieveAEstimateHandler(req, res) {
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)
        const estimateId = req.params.estimateId

        return (async () => {
        
            const customer = await retrieveAEstimate(companyId, estimateId)
            
            res.json(customer)

            logger.info(`Company: ${companyId} retrieved estimate ${estimateId} succesfully`)
        })()
    }, res, logger)
}

module.exports = retrieveAEstimateHandler