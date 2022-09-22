const { runWithErrorHandling, validateToken } = require('../../utils')
const { estimates: {retrieveEstimates} } = require('../../logic')
const logger = require('../../logger')(module)

function retrieveEstimatesHandler(req, res) {
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)

        return (async () => {
        
            const estimates = await retrieveEstimates(companyId)
            
            res.json(estimates)

            logger.info(`Company: ${companyId} retrieved estimates succesfully`)
        })()
    }, res, logger)
}

module.exports = retrieveEstimatesHandler