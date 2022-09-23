require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const chai = require('chai')
const chaiaspromise = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiaspromise)
const retrieveCustomers = require('./retrieveCustomers')
const { NotFoundError } = require('errors')
const { User, Company, InventoryItem, Estimate, Invoice, Customer } = require('../../models')
const { env: { MONGO_URL_TEST } } = process

describe('retrieveCustomers', () => {
    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Company.deleteMany(), InventoryItem.deleteMany(), Estimate.deleteMany(), Invoice.deleteMany(), Customer.deleteMany()]))

    it('succeeds retrieving all customers', async () => {
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

        await Customer.create({company: newCompany.id, name: customerName}, {company:newCompany.id, name: customerName2})

        const customers = await retrieveCustomers(newCompany.id)
        expect(customers).to.have.length(2)

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

        await Customer.create({company: newCompany.id, name: customerName}, {company:newCompany.id, name: customerName2})

        const wrongCompanyId = new ObjectId()

        await expect(retrieveCustomers(wrongCompanyId)).to.eventually.be.rejectedWith('Company not found').and.be.an.instanceOf(NotFoundError)
        

    })

    after(async () => {
        await Promise.all([User.deleteMany(), Company.deleteMany()])
        disconnect()
    })
})