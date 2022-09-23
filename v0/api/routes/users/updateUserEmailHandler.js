const { runWithErrorHandling, validateToken } = require('../../utils')
const { users: {updateUserEmail} } = require('../../logic')
const logger = require('../../logger')(module)


function updateUserEmailHandler(req, res){
    runWithErrorHandling(async () => {
        const { userId } = await validateToken(req)

        const { body: { email } } = req

        await updateUserEmail(userId, email)

        res.status(204).send()
        
        logger.info(`User: ${userId} changed email succesfully`)
    }, res, logger)
}

module.exports = updateUserEmailHandler