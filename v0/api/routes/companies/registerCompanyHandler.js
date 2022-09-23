const { runWithErrorHandling } = require('../../utils')
const { company: {registerCompany} } = require('../../logic')
const logger = require('../../logger')(module)

function registerCompanyHandler(req, res){
    runWithErrorHandling(async () => {
        const { body: { name, lastName, email, password} } = req

        await registerCompany(name, lastName, email, password)

        res.status(201).send()
    
    }, res, logger)
}

module.exports = registerCompanyHandler