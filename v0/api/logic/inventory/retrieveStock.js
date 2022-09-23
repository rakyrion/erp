const { InventoryItem, Company } = require('../../models')
const {Types: {ObjectId}} = require('mongoose')
const { NotFoundError, FormatError } = require('errors')

function retrieveStock(companyId){
    if(!(ObjectId.isValid(companyId))) throw new FormatError('Company is not valid')

    return (async () => {
        const foundCompany = await Company.findById(companyId).lean() 

        if (!foundCompany) throw new NotFoundError('Company not found')

        const stock = await InventoryItem.find({company: companyId}).lean()
    
        stock.forEach(item => {
            item.id = item._id
            delete item._id
            delete item.__v
        })
        return stock
    })()
}

module.exports = retrieveStock