const { Invoice, Company } = require('../../models')
const { Types: { ObjectId } } = require('mongoose')
const { NotFoundError, FormatError } = require('errors')

function retrieveAInvoice(companyId, invoiceId) {
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company ID is not valid')
    if (!(ObjectId.isValid(invoiceId))) throw new FormatError('Invoice ID is not valid')

    return (async () => {
        const foundCompany = await Company.findById(companyId).lean()

        if (!foundCompany) throw new NotFoundError('Company not found')

        const invoice = await Invoice.findOne({ company: companyId, _id: invoiceId }).lean()

        invoice.id = invoice._id
        delete invoice._id
        delete invoice.__v

        return invoice
    })()
}

module.exports = retrieveAInvoice