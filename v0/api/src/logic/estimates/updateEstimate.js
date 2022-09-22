const { Estimate } = require('../../models')
const { NotFoundError, FormatError } = require('errors')
const { Types: { ObjectId } } = require('mongoose')

function updateEstimate( estimateId, companyId, {estimateNumber, customer, terms, estimateDate, products, totalAmount, status}){
    //TODO VALIDATE INPUTS
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company ID is not valid')
    if (!(ObjectId.isValid(estimateId))) throw new FormatError('Customer ID is not valid')

    return (async () => {
        
        const estimate = Estimate.findOne({_id : estimateId, company: companyId}).lean()
        if(!estimate) throw new NotFoundError(`estimate with ID ${estimateId} not found or not belong to company with ID ${companyId}`)

        await estimate.updateOne({_id: estimateId}, {estimateNumber, customer, terms, estimateDate, products, totalAmount, status})
    })()
}

module.exports = updateEstimate