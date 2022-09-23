const { Estimate, Company } = require('../../models')
const {Types: {ObjectId}} = require('mongoose')
const { NotFoundError, FormatError } = require('errors')

function retrieveEstimates(companyId){
    if(!(ObjectId.isValid(companyId))) throw new FormatError('Company is not valid')

    return (async () => {
        const foundCompany = await Company.findById(companyId).lean() 

        if (!foundCompany) throw new NotFoundError('Company not found')

        const estimates = await Estimate.find({company: companyId}).lean()
        
        estimates.forEach(estimate => {
            estimate.id = estimate._id
            delete estimate._id
            delete estimate.__v
        })
        return estimates
    })()
}

module.exports = retrieveEstimates