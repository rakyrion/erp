const { runWithErrorHandling } = require('../../utils')
const { users: {authenticateUser} } = require('../../logic')
const logger = require('../../logger')(module)
const { sign } = require('jsonwebtoken')
const {env : { JWT_SECRET, JWT_EXP }} = process

function authenticateUserHandler(req, res){
    runWithErrorHandling(async () => {

        const { body: { email, password } } = req

        const {userId, companyId} = await authenticateUser(email, password)

        const token = sign({ sub: {userId, companyId} }, JWT_SECRET , { expiresIn: JWT_EXP })

        res.json({ token })

        logger.info(`User: ${userId} authenticated succesfully`)
    }, res, logger)
}

module.exports = authenticateUserHandler