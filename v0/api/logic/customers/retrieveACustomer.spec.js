require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const chai = require('chai')
const chaiaspromise = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiaspromise)
const retrieveACustomer = require('./retrieveACustomer')
const { NotFoundError } = require('errors')
const { User, Company, InventoryItem, Estimate, Invoice, Customer } = require('../../models')
const { env: { MONGO_URL_TEST } } = process

describe('retrieveACustomer', () => {
    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Company.deleteMany(), InventoryItem.deleteMany(), Estimate.deleteMany(), Invoice.deleteMany(), Customer.deleteMany()]))

    it('succeeds retrieving a customer', async () => {
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
        const customerName2 = 'Spec Customer 2'

        const customers = await Customer.create({ company: newCompany.id, name: customerName }, { company: newCompany.id, name: customerName2 })

        const customerToRetrieve = customers[0]

        const customer = await retrieveACustomer(newCompany.id, customerToRetrieve.id)

        expect(customer.name).to.equal(customerName)
        expect(customer.id.toString()).to.equal(customerToRetrieve.id)
        expect(customer.company.toString()).to.equal(newCompany.id)
        expect(customer.email).to.be.undefined
        expect(customer.contactName).to.be.undefined
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

    it('Should fail if company not found', async () => {
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
        const customerName2 = 'Spec Customer 2'

        const customers = await Customer.create({ company: newCompany.id, name: customerName }, { company: newCompany.id, name: customerName2 })

        const customerToRetrieve = customers[0]

        const wrongCompanyId = new ObjectId()

        await expect(retrieveACustomer(wrongCompanyId, customerToRetrieve.id)).to.eventually.be.rejectedWith('Company not found').and.be.an.instanceOf(NotFoundError)


    })

    //TODO fails if customer does not exist

    after(async () => {
        await Promise.all([User.deleteMany(), Company.deleteMany()])
        disconnect()
    })
})