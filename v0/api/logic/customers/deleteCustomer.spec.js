require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const chai = require('chai')
const chaiaspromise = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiaspromise)
const deleteCustomer = require('./deleteCustomer')
const { NotFoundError, ForbiddenError } = require('errors')
const { User, Company, InventoryItem, Estimate, Invoice, Customer } = require('../../models/')
const { env: { MONGO_URL_TEST } } = process

describe('deleteCustomer', () => {
    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Company.deleteMany(), InventoryItem.deleteMany(), Estimate.deleteMany(), Invoice.deleteMany(), Customer.deleteMany()]))

    it('succeeds deleting a customer', async () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'

        const newCompany = await Company.create({ name, companyEmail: email })
        const newUser = await User.create({ name, lastName, email, password, role, company: newCompany.id })
        newCompany.admin = newUser.id
        await newCompany.save()

        const customerName = 'Spec Customer'

        const customer1 = await Customer.create({company: newCompany.id, name: customerName,})

        const result = await deleteCustomer(newUser.id, newCompany.id, customer1.id)
        expect(result).to.be.undefined


        const customers = await Customer.find()
        expect(customers).to.have.length(0)

    })

    it('Should fail if customer ID is not found in company', async () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'

        const newCompany = await Company.create({ name, companyEmail: email })
        const newUser = await User.create({ name, lastName, email, password, role, company: newCompany.id })
        newCompany.admin = newUser.id
        await newCompany.save()


        const customerName = 'Spec Customer'

        const customer1 = await Customer.create({company: newCompany.id, name: customerName,})
        const wrongCustId = new ObjectId()
        await expect(deleteCustomer(newUser.id, newCompany.id, wrongCustId )).to.eventually.be.rejectedWith(`Customer ${wrongCustId} not found in Company with ID ${newCompany.id}`).and.be.an.instanceOf(NotFoundError)


        const customers = await Customer.find()
        expect(customers).to.have.length(1)
        const [customer] = customers

        expect(customer.name).to.equal(customerName)
        expect(customer.email).to.be.undefined
        expect(customer.contactName.firstName).to.be.undefined
        expect(customer.phone).to.be.undefined
        expect(customer.website).to.be.undefined
        expect(customer.legalId).to.be.undefined
        expect(customer.billingAddress.street).to.equal('')
        expect(customer.billingAddress.town).to.equal('')
        expect(customer.billingAddress.state).to.equal('')
        expect(customer.billingAddress.zipCode).to.equal('')
        expect(customer.billingAddress.country).to.equal('')
        expect(customer.shippingAddress.shippingStreet).to.equal('')
        expect(customer.shippingAddress.shippingTown).to.equal('')
        expect(customer.shippingAddress.shippingState).to.equal('')
        expect(customer.shippingAddress.shippingZipCode).to.equal('')
        expect(customer.shippingAddress.shippingCountry).to.equal('')
        expect(customer.payTerms).to.be.undefined

    })

    it('Should fail if user is accountant (no permission to delete)', async () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'accountant'

        const newCompany = await Company.create({ name, companyEmail: email })
        const newUser = await User.create({ name, lastName, email, password, role, company: newCompany.id })


        const customerName = 'Spec Customer'

        const customer1 = await Customer.create({company: newCompany.id, name: customerName,})
        await expect(deleteCustomer(newUser.id, newCompany.id, customer1.id )).to.eventually.be.rejectedWith(`User ${newUser.id} does not have permission to delete customers`).and.be.an.instanceOf(ForbiddenError)


        const customers = await Customer.find()
        expect(customers).to.have.length(1)
        const [customer] = customers

        expect(customer.name).to.equal(customerName)
        expect(customer.email).to.be.undefined
        expect(customer.contactName.firstName).to.be.undefined
        expect(customer.phone).to.be.undefined
        expect(customer.website).to.be.undefined
        expect(customer.legalId).to.be.undefined
        expect(customer.billingAddress.street).to.equal('')
        expect(customer.billingAddress.town).to.equal('')
        expect(customer.billingAddress.state).to.equal('')
        expect(customer.billingAddress.zipCode).to.equal('')
        expect(customer.billingAddress.country).to.equal('')
        expect(customer.shippingAddress.shippingStreet).to.equal('')
        expect(customer.shippingAddress.shippingTown).to.equal('')
        expect(customer.shippingAddress.shippingState).to.equal('')
        expect(customer.shippingAddress.shippingZipCode).to.equal('')
        expect(customer.shippingAddress.shippingCountry).to.equal('')
        expect(customer.payTerms).to.be.undefined
    })

    //TODO -> Fails if customer has Estimates/Invoices
    
    after(async () => {
        await Promise.all([User.deleteMany(), Company.deleteMany()])
        disconnect()
    })
})