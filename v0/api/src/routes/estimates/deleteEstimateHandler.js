const { runWithErrorHandling } = require('../../utils')
const { estimates: {deleteEstimate} } = require('../../logic')
const logger = require('../../logger')(module)
const { validateToken } = require('../../utils')

function deleteEstimateHandler(req, res){
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)

        const estimateId = req.params.estimateId

        await deleteEstimate(companyId, estimateId)

        res.status(200).send()
    
    }, res, logger)
}

module.exports = deleteEstimateHandler