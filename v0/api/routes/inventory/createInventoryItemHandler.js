const { runWithErrorHandling, validateToken } = require('../../utils')
const { inventory: {createInventoryItem} } = require('../../logic')
const logger = require('../../logger')(module)

function createInventoryItemHandler(req, res){
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)

        const { body: { name, sku, category, cost, averageCost, description, minStock, initStock} } = req

        await createInventoryItem(companyId, { name, sku, category, cost, averageCost, description, minStock, stock : initStock})

        res.status(204).send()
    
        logger.info(`Company: ${companyId} created item succesfully`)
    }, res, logger)
}

module.exports = createInventoryItemHandler