const { runWithErrorHandling } = require('../../utils')
const { users: { deleteUser } } = require('../../logic')
const logger = require('../../logger')(module)
const { validateToken } = require('../../utils')

function deleteUserHandler(req, res){
    runWithErrorHandling(async () => {
        const {  userId : adminId, companyId } = await validateToken(req)

        const idToDelete = req.params.userId

        await deleteUser(adminId, companyId, idToDelete)

        res.status(200).send()
    
    }, res, logger)
}

module.exports = deleteUserHandler