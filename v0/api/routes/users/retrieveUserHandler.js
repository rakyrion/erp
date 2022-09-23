const { runWithErrorHandling, validateToken } = require('../../utils')
const { users: {retrieveUser} } = require('../../logic')
const logger = require('../../logger')(module)

function retrieveUserHandler(req, res) {
    runWithErrorHandling(async () => {
        const { userId } = await validateToken(req)

        return (async () => {
        
            const user = await retrieveUser(userId)

            res.json(user)

            logger.info(`User: ${user.email} retrieved succesfully`)
        })()
    }, res, logger)
}

module.exports = retrieveUserHandler