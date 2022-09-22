const { Invoice, InventoryItem } = require('../../models')
const { NotFoundError, FormatError } = require('errors')
const { Types: { ObjectId } } = require('mongoose')

function updateInvoice(invoiceId, companyId, { invoiceNumber, customer, terms, invoiceDate, dueDate, products, balance, totalAmount, status }) {
    //TODO VALIDATE INPUTS
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company ID is not valid')
    if (!(ObjectId.isValid(invoiceId))) throw new FormatError('Customer ID is not valid')

    return (async () => {
        
        const invoice = await Invoice.findOne({ _id: invoiceId, company: companyId }).lean()
        if (!invoice) throw new NotFoundError(`invoice with ID ${invoiceId} not found or not belong to company with ID ${companyId}`)



        const oldProductsIds = invoice.products.map(({ id }) => id)

        const oldItemsFound = await InventoryItem.find({ _id: { $in: oldProductsIds } })
        
        oldItemsFound.forEach(item => {
            const oldProduct = invoice.products.find(product => product.id.toString() === item._id.toString())
            const newProduct = products.find(_newProduct => _newProduct.id.toString() === item._id.toString())

            if(item.stock >= 0 ){
                return item.stock = item.stock - (newProduct.amount - oldProduct.amount)
            }

            if(newProduct.amount > oldProduct.amount) return item.stock = item.stock + (newProduct.amount - oldProduct.amount)

            return item.stock = item.stock + (oldProduct.amount - newProduct.amount )

        })

        await InventoryItem.bulkSave(oldItemsFound)

        await Invoice.updateOne({ _id: invoiceId }, { invoiceNumber, customer, terms, invoiceDate, dueDate, products, balance, totalAmount, status })
    })()
}

module.exports = updateInvoice