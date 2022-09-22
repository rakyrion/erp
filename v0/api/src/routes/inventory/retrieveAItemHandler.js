const { runWithErrorHandling, validateToken } = require('../../utils')
const { inventory: {retrieveAItem} } = require('../../logic')
const logger = require('../../logger')(module)

function retrieveAItemHandler(req, res) {
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)
        const itemId = req.params.itemId

        return (async () => {
        
            const item = await retrieveAItem(companyId, itemId)
            
            res.json(item)

            logger.info(`Company: ${companyId} retrieved item ${itemId} succesfully`)
        })()
    }, res, logger)
}

module.exports = retrieveAItemHandler