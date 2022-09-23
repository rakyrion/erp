require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const chai = require('chai')
const chaiaspromise = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiaspromise)
const deleteCompany = require('./deleteCompany')
const { DuplicityError, AuthError } = require('errors')
const { User, Company, InventoryItem, Estimate, Invoice, Customer } = require('../../models/')
const { env: { MONGO_URL_TEST } } = process

describe('deleteCompany', () => {
    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Company.deleteMany(), InventoryItem.deleteMany(), Estimate.deleteMany(), Invoice.deleteMany(), Customer.deleteMany()]))

    it('succeeds deleting a company (And all invoices,customers,estimates, items...)', async () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'

        const newCompany = await Company.create({name, companyEmail: email })
        const newUser = await User.create({name, lastName, email, password, role, company: newCompany.id})
        newCompany.admin = newUser.id
        await newCompany.save()

        const result = await deleteCompany(newUser.id, newCompany.id, password, password)
        expect(result).to.be.undefined

        const companies = await Company.find()
        expect(companies).to.have.length(0)

        const users = await User.find()
        expect(users).to.have.length(0)
        
        const inventory = await InventoryItem.find()
        expect(inventory).to.have.length(0)

        const estimates = await Estimate.find()
        expect(estimates).to.have.length(0)

        const invoices = await Invoice.find()
        expect(invoices).to.have.length(0)

        const customers = await Customer.find()
        expect(customers).to.have.length(0)

        //TODO CREATE INVOICE, ESTIMATES AND CHECK IF STILL EXISTS...

    })

    it('Should fail if user is not admin of the company', async () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'

        const newCompany = await Company.create({name, companyEmail: email })
        const newUser = await User.create({name, lastName, email, password, role, company: newCompany.id})
        newCompany.admin = newUser.id
        await newCompany.save()


        const name2 = 'User2'
        const email2 = 'spec2@testing.com'
        const role2 = 'employee'

        const newUser2 = await User.create({name : name2, lastName, email : email2, password, role : role2, company: newCompany.id})

        await expect(deleteCompany(newUser2.id, newCompany.id, password, password)).to.eventually.be.rejectedWith(`User with id ${newUser2.id} is not the admin of the company`).and.be.an.instanceOf(AuthError)

        const companies = await Company.find()
        expect(companies).to.have.length(1)

        const users = await User.find()
        expect(users).to.have.length(2)
        
        //TODO CREATE INVOICE, ESTIMATES AND CHECK IF STILL EXISTS...

    })

    // TODO INPUT VALIDATIONS ERROR (REGEX...)

    after( async () => {
        await Promise.all([User.deleteMany(), Company.deleteMany()])
        disconnect()
    })
})