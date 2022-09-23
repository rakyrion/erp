const express = require('express')
const { Router, json } = express
const jsonBodyParser = json()
const { registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserEmailHandler, updateUserPasswordHandler, deleteUserHandler, authenticateGoogleHandler, linkGoogleAccountHandler } = require('./users')
const { registerCompanyHandler, updateCompanyDetailsHandler, deleteCompanyHandler, registerCompanyGoogleHandler } = require('./companies')
const { createInventoryItemHandler, updateInventoryItemHandler, deleteInventoryItemHandler, retrieveStockHandler, retrieveAItemHandler } = require('./inventory')
const { createEstimateHandler, deleteEstimateHandler, retrieveEstimatesHandler, updateEstimateHandler, retrieveAEstimateHandler } = require('./estimates')
const { createCustomerHandler, updateCustomerHandler, deleteCustomerHandler, retrieveCustomersHandler, retrieveACustomerHandler } = require('./customers')
const { createInvoiceHandler, deleteInvoiceHandler, retrieveInvoicesHandler, updateInvoiceHandler, retrieveAInvoiceHandler, createInvoicePDFHandler, sendInvoiceEmailHandler } = require('./invoices')

const companiesRouter = Router()

companiesRouter.post('/companies', jsonBodyParser, registerCompanyHandler)

companiesRouter.post('/companies/google', jsonBodyParser, registerCompanyGoogleHandler)

companiesRouter.patch('/companies', jsonBodyParser, updateCompanyDetailsHandler)

companiesRouter.delete('/companies', jsonBodyParser, deleteCompanyHandler)

const usersRouter = Router()

usersRouter.post('/users', jsonBodyParser, registerUserHandler)

usersRouter.post('/users/google', jsonBodyParser, linkGoogleAccountHandler)

usersRouter.post('/users/auth', jsonBodyParser, authenticateUserHandler)

usersRouter.post('/users/auth/google', jsonBodyParser, authenticateGoogleHandler)

usersRouter.get('/users', retrieveUserHandler)

usersRouter.patch('/users/email', jsonBodyParser, updateUserEmailHandler)

usersRouter.patch('/users/password', jsonBodyParser, updateUserPasswordHandler)

usersRouter.delete('/users/:userId', deleteUserHandler)

const inventoryRouter = Router()

inventoryRouter.post('/items', jsonBodyParser, createInventoryItemHandler)

inventoryRouter.get('/items', retrieveStockHandler)

inventoryRouter.get('/items/:itemId', retrieveAItemHandler)

inventoryRouter.patch('/items/:itemId', jsonBodyParser, updateInventoryItemHandler)

inventoryRouter.delete('/items/:itemId', deleteInventoryItemHandler)

const estimatesRouter = Router()

estimatesRouter.post('/estimates', jsonBodyParser, createEstimateHandler)

estimatesRouter.get('/estimates', retrieveEstimatesHandler)

estimatesRouter.get('/estimates/:estimateId', retrieveAEstimateHandler)

estimatesRouter.patch('/estimates/:estimateId', jsonBodyParser, updateEstimateHandler)

estimatesRouter.delete('/estimates/:estimateId', deleteEstimateHandler)

const customersRouter = Router()

customersRouter.post('/customers', jsonBodyParser, createCustomerHandler)

customersRouter.get('/customers', retrieveCustomersHandler)

customersRouter.get('/customers/:customerId', retrieveACustomerHandler)

customersRouter.patch('/customers/:customerId', jsonBodyParser, updateCustomerHandler)

customersRouter.delete('/customers/:customerId', deleteCustomerHandler)

const invoicesRouter = Router()

invoicesRouter.post('/invoices', jsonBodyParser, createInvoiceHandler)

invoicesRouter.get('/invoices', retrieveInvoicesHandler)

invoicesRouter.get('/invoices/:invoiceId', retrieveAInvoiceHandler)

invoicesRouter.get('/invoices/pdf/:invoiceId', createInvoicePDFHandler)

invoicesRouter.post('/invoices/mail/:invoiceId', jsonBodyParser, sendInvoiceEmailHandler)

invoicesRouter.patch('/invoices/:invoiceId', jsonBodyParser, updateInvoiceHandler)

invoicesRouter.delete('/invoices/:invoiceId', deleteInvoiceHandler)


module.exports = {
    usersRouter,
    companiesRouter,
    inventoryRouter,
    estimatesRouter,
    customersRouter,
    invoicesRouter
}