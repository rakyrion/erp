const { runWithErrorHandling } = require('../../utils')
const { company: {deleteCompany} } = require('../../logic')
const logger = require('../../logger')(module)
const { validateToken } = require('../../utils')

function deleteCompanyHandler(req, res){
    runWithErrorHandling(async () => {
        const { userId, companyId } = await validateToken(req)

        const { body: {password, confirmPassword} } = req

        await deleteCompany(userId, companyId, password, confirmPassword)

        res.status(200).send()
    
    }, res, logger)
}

module.exports = deleteCompanyHandler