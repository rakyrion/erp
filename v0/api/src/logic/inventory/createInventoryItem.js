const { InventoryItem , Company } = require('../../models')
const { NotFoundError, DuplicityError, FormatError } = require('errors')
const { Types: { ObjectId } } = require('mongoose')

function createInventoryItem(company, { name, sku, category, cost, averageCost, description, minStock, stock}){
    //TODO VALIDATE INPUTS
    if (!(ObjectId.isValid(company))) throw new FormatError('Company ID is not valid');

    return (async () => {
        
        const companyFound = await Company.findById(company)

        if (!companyFound) throw new NotFoundError(`Company with ID ${company} not found`)

        const found = await InventoryItem.findOne({ $and :[ {company}, { $or:[{ name }, { sku }]} ]})

        if (found){
            if(found.name === name) throw new DuplicityError(`There's already a product named ${name}`)
            else if(found.sku === sku) throw new DuplicityError(`There's already a product with SKU ${sku}`)
        } 
        if(!category) category = 'uncategorized'
        await InventoryItem.create({ company, name, sku , category , cost, averageCost, description, minStock, stock })
    })()
}

module.exports = createInventoryItem