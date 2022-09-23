const { InventoryItem , Company } = require('../../models')
const { NotFoundError, DuplicityError } = require('errors')
const { Types: { ObjectId } } = require('mongoose')

function updateInventoryItem(itemId, companyId, { name, sku, category, cost, averageCost, description, minStock, stock}){
    //TODO VALIDATE INPUTS
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company ID is not valid');

    return (async () => {
        
        const item = await InventoryItem.findById(itemId)

        if(!item) throw new NotFoundError(`Item with ID ${itemId} not found`)

        const companyFound = await Company.findById(companyId)

        if (!companyFound) throw new NotFoundError(`Company with ID ${companyId} not found`)

        const found = await InventoryItem.findOne({ $and :[ {companyId}, { $or:[{ name }, {$and : [{ sku :{$ne: undefined} }, {sku}]}]} ]})

        if (found && item.id !== found.id){
            if(found.name === name) throw new DuplicityError(`There's already a product named ${name}`)
            else if(found.sku === sku) throw new DuplicityError(`There's already a product with SKU ${sku}`)
        } 

        await InventoryItem.updateOne({_id: itemId}, { name, sku , category , cost, averageCost, description, minStock, stock })
    })()
}

module.exports = updateInventoryItem