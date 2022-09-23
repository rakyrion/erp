const { Invoice, InventoryItem } = require('../../models')
const { NotFoundError, FormatError } = require('errors')
const { Types: { ObjectId }} = require('mongoose')


function deleteInvoice(company, invoiceId){
    if (!(ObjectId.isValid(company))) throw new FormatError('Company ID is not valid')
    if (!(ObjectId.isValid(invoiceId))) throw new FormatError('Invoice ID is not valid')

    return (async() => {
        
        const invoice = await Invoice.findOne({_id : invoiceId, company})
        if(!invoice) throw new NotFoundError(`Invoice with ID ${invoiceId} not found in Company with ID ${company}`)

        const productsIds = invoice.products.map(({id}) => id)

        const itemsFound = await InventoryItem.find({_id : {$in : productsIds}})

        itemsFound.forEach(item => {
            const product = invoice.products.find(product => product.id.toString() === item._id.toString())

            item.stock = item.stock + product.amount
        })

        await InventoryItem.bulkSave(itemsFound)

        await invoice.delete()
        
    })()
}

module.exports = deleteInvoice