const { runWithErrorHandling, validateToken } = require('../../utils')
const { users: {updateUserPassword} } = require('../../logic')
const logger = require('../../logger')(module)


function updateUserPasswordHandler(req, res){
    runWithErrorHandling(async () => {
        const { userId } = await validateToken(req)

        const { body: { oldPassword, newPassword, confirmNewPassword  } } = req

        await updateUserPassword(userId, oldPassword, newPassword, confirmNewPassword)

        res.status(204).send()
        
        logger.info(`User: ${userId} changed password succesfully`)
    }, res, logger)
}

module.exports = updateUserPasswordHandler