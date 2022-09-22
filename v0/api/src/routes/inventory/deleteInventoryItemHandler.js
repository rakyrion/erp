const { runWithErrorHandling } = require('../../utils')
const { inventory: {deleteInventoryItem} } = require('../../logic')
const logger = require('../../logger')(module)
const { validateToken } = require('../../utils')

function deleteInventoryItemHandler(req, res){
    runWithErrorHandling(async () => {
        const { userId, companyId } = await validateToken(req)

        const itemId = req.params.itemId

        await deleteInventoryItem(userId, companyId, itemId)

        res.status(200).send()
    
    }, res, logger)
}

module.exports = deleteInventoryItemHandler