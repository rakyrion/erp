const { runWithErrorHandling } = require('../../utils')
const { users: {authenticateGoogle} } = require('../../logic')
const logger = require('../../logger')(module)
const { sign } = require('jsonwebtoken')
const {env : { JWT_SECRET, JWT_EXP }} = process

function authenticateGoogleUserHandler(req, res){
    runWithErrorHandling(async () => {
        const { body: { googleId } } = req

        const {userId, companyId} = await authenticateGoogle(googleId)

        const token = sign({ sub: {userId, companyId} }, JWT_SECRET , { expiresIn: JWT_EXP })

        res.json({ token })

        logger.info(`User: ${userId} authenticated succesfully with Google`)
    }, res, logger)
}

module.exports = authenticateGoogleUserHandler