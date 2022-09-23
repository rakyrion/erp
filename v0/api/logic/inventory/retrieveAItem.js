const { InventoryItem, Company } = require('../../models')
const { Types: { ObjectId } } = require('mongoose')
const { NotFoundError, FormatError } = require('errors')

function retrieveACustomer(companyId, itemId) {
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company is not valid')
    if (!(ObjectId.isValid(itemId))) throw new FormatError('Customer is not valid')

    return (async () => {
        const foundCompany = await Company.findById(companyId).lean()

        if (!foundCompany) throw new NotFoundError('Company not found')

        const item = await InventoryItem.findOne({ company: companyId, _id: itemId }).lean()

        item.id = item._id
        delete item._id
        delete item.__v

        return item
    })()
}

module.exports = retrieveACustomer