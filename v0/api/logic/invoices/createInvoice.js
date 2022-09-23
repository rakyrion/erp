const { Invoice , Company, Customer, InventoryItem } = require('../../models')
const { Types: { ObjectId } } = require('mongoose');
const { DuplicityError, NotFoundError, FormatError } = require('errors');

function createInvoice(company, {invoiceNumber, customer, terms, invoiceDate, dueDate, products, totalAmount, status = 'pending'}){
    //TODO Validate Inputs
    if (!(ObjectId.isValid(company))) throw new FormatError('Company ID is not valid');

    return (async() => {
        const companyFound = await Company.findById(company)
        if (!companyFound) throw new NotFoundError(`Company with ID ${company} not found`)

        const invoiceFound = await Invoice.findOne({company, invoiceNumber})
        if(invoiceFound) throw new DuplicityError(`There's already an invoice with number ${invoiceNumber}`)

        const customerFound = await Customer.findOne({company, _id : customer.refId})
        if (!customerFound) throw new NotFoundError(`Customer with ID ${customer.refId} not found`)
  
        const productIds = products.map(({id}) => id)

        const itemsFound = await InventoryItem.find({ _id: {  $in: productIds}})
        if (itemsFound.length !== productIds.length) {
            const foundIds = itemsFound.map(item => item.id)

            const notFoundIds = productIds.filter(productId => !foundIds.includes(productId))

            throw new NotFoundError(`items with ids ${notFoundIds} not found`)
        }
        
        await Invoice.create({company, invoiceNumber, customer, terms, invoiceDate, dueDate, products, balance: totalAmount, totalAmount, status})

        // MODIFICO CADA DOCUMENTO PARA POSTERIORMENTE GUARDARLOS TODOS CON BULK
        itemsFound.forEach(item => {
            const product = products.find(product => product.id === item._id.toString())

            item.stock = item.stock - product.amount
        })

        await InventoryItem.bulkSave(itemsFound)
    })()
}

module.exports = createInvoice