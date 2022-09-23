const { runWithErrorHandling } = require('../../utils')
const { company: {updateCompanyDetails} } = require('../../logic')
const logger = require('../../logger')(module)
const { validateToken } = require('../../utils')

function updateCompanyDetailsHandler(req, res){
    runWithErrorHandling(async () => {
        const { userId, companyId } = await validateToken(req)

        const { body: {name, legalName, legalId, telephone, companyEmail, customerFacingEmail, postalAddress, physicalAddress, sector, website} } = req

        await updateCompanyDetails(userId, companyId, {name, legalName, legalId, telephone, companyEmail, customerFacingEmail, postalAddress, physicalAddress, sector, website})

        res.status(204).send()
    
    }, res, logger)
}

module.exports = updateCompanyDetailsHandler