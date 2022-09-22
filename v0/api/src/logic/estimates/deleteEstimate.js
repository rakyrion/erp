const { Estimate } = require('../../models')
const { NotFoundError, FormatError } = require('errors')
const { Types: { ObjectId }} = require('mongoose')


function deleteEstimate(company, estimateId){
    if (!(ObjectId.isValid(company))) throw new FormatError('Company ID is not valid')
    if (!(ObjectId.isValid(estimateId))) throw new FormatError('Estimate ID is not valid')


    return (async() => {
        
        const estimate = await Estimate.findOne({_id : estimateId, company})
        if(!estimate) throw new NotFoundError(`Estimate with ID ${estimateId} not found in Company with ID ${company}`)

        await estimate.delete()
        
    })()
}

module.exports = deleteEstimate