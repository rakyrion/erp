const { runWithErrorHandling } = require('../../utils')
const logger = require('../../logger')(module)
const { inventory: { updateInventoryItem } } = require('../../logic')
const { validateToken } = require('../../utils')

function updateInventoryItemHandler(req, res){
    
    runWithErrorHandling(async () => {
        const { companyId } = await validateToken(req)
        
        const { body: { name, sku, category, cost, averageCost, description, minStock, stock} } = req

        const itemId = req.params.itemId
        
        await updateInventoryItem(itemId, companyId ,{ name, sku, category, cost, averageCost, description, minStock, stock})

        res.status(204).send()

        logger.info(`Item: ${itemId} updated his email succesfully`)
    }, res, logger)
}

module.exports = updateInventoryItemHandler