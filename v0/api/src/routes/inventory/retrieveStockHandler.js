const { runWithErrorHandling, validateToken } = require('../../utils')
const { inventory: {retrieveStock} } = require('../../logic')
const logger = require('../../logger')(module)

function retrieveStockHandler(req, res) {
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)

        return (async () => {
        
            const stock = await retrieveStock(companyId)
            
            res.json(stock)

            logger.info(`Company: ${companyId} retrieved stock succesfully`)
        })()
    }, res, logger)
}

module.exports = retrieveStockHandler