const { Estimate, Company } = require('../../models')
const { Types: { ObjectId } } = require('mongoose')
const { NotFoundError, FormatError } = require('errors')

function retrieveAEstimate(companyId, estimateId) {
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Estimate is not valid')
    if (!(ObjectId.isValid(estimateId))) throw new FormatError('Customer is not valid')

    return (async () => {
        const foundCompany = await Company.findById(companyId).lean()

        if (!foundCompany) throw new NotFoundError('Company not found')

        const estimate = await Estimate.findOne({ company: companyId, _id: estimateId }).lean()

        estimate.id = estimate._id
        delete estimate._id
        delete estimate.__v

        return estimate
    })()
}

module.exports = retrieveAEstimate