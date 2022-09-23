const { runWithErrorHandling, validateToken } = require('../../utils')
const { users: {linkGoogleAccount} } = require('../../logic')
const logger = require('../../logger')(module)

function linkGoogleAccountHandler(req, res){
    runWithErrorHandling(async () => {
        const { userId, companyId } = await validateToken(req)

        const { body: { password, googleId } } = req

        await linkGoogleAccount(userId, companyId, password, googleId)

        res.send()

        logger.info(`User: ${userId} linked account with Google`)
    }, res, logger)
}

module.exports = linkGoogleAccountHandler