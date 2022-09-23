const { runWithErrorHandling } = require('../../utils')
const { customers: {deleteCustomer} } = require('../../logic')
const logger = require('../../logger')(module)
const { validateToken } = require('../../utils')

function deleteCustomerHandler(req, res){
    runWithErrorHandling(async () => {
        const { userId, companyId } = await validateToken(req)

        const customerId = req.params.customerId

        await deleteCustomer(userId, companyId, customerId)

        res.status(200).send()
    
    }, res, logger)
}

module.exports = deleteCustomerHandler