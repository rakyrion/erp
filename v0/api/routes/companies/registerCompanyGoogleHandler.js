const { runWithErrorHandling } = require('../../utils')
const { company: {registerCompanyGoogle} } = require('../../logic')
const logger = require('../../logger')(module)

function registerCompanyGoogleHandler(req, res){
    runWithErrorHandling(async () => {
        const { body: { name, lastName, email, googleId} } = req

        await registerCompanyGoogle(name, lastName, email, googleId)

        res.status(201).send()
    
    }, res, logger)
}

module.exports = registerCompanyGoogleHandler