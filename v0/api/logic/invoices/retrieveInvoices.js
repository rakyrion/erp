const { Invoice, Company } = require('../../models')
const {Types: {ObjectId}} = require('mongoose')
const { NotFoundError, FormatError } = require('errors')

function retrieveInvoices(companyId){
    if(!(ObjectId.isValid(companyId))) throw new FormatError('Company is not valid')

    return (async () => {
        const foundCompany = await Company.findById(companyId).lean() 

        if (!foundCompany) throw new NotFoundError('Company not found')

        const invoices = await Invoice.find({company: companyId}).lean()
        
        invoices.forEach(invoice => {
            invoice.id = invoice._id
            delete invoice._id
            delete invoice.__v
        })
        return invoices
    })()
}

module.exports = retrieveInvoices