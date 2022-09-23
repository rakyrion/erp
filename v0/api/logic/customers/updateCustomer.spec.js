require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const chai = require('chai')
const chaiaspromise = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiaspromise)
const updateCustomer = require('./updateCustomer')
const { NotFoundError } = require('errors')
const { User, Company, InventoryItem, Estimate, Invoice, Customer } = require('../../models')
const { env: { MONGO_URL_TEST } } = process

describe('updateCustomer', () => {
    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Company.deleteMany(), InventoryItem.deleteMany(), Estimate.deleteMany(), Invoice.deleteMany(), Customer.deleteMany()]))

    it('succeeds updating a customer', async () => {
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

        const customerToUpdate = await Customer.create({company: newCompany.id, name: customerName})

        const newCustomerName = 'New Name'
        const customerEmail = 'spec@email.com'
        const phone = 666555444
        const website = 'www.specweb.com'
        const legalId = '123123123-X'
        const billingAddress = {
            street: 'Spec street',
            town: 'Spec Town',
            state: 'Spec State',
            zipCode: 'Spec zipCode',
            country: 'Spec country',
        }
        const shippingAddress = {
            shippingStreet: 'S Spec Street',
            shippingTown: 'S spec Town',
            shippingState: 'S spec State',
            shippingZipCode: 'S spec ZipCode',
            shippingCountry: 'S spec country',
        }
        const payTerms = '30 days'
        
        const result = await updateCustomer(customerToUpdate.id, newCompany.id, {name: newCustomerName, email: customerEmail, phone, website, legalId, billingAddress, shippingAddress, payTerms} )
        expect(result).to.be.undefined

        const customers = await Customer.find()
        expect(customers).to.have.length(1)
        const [customer] = customers

        expect(customer.name).to.equal(newCustomerName)
        expect(customer.email).to.be.equal(customerEmail)
        expect(customer.contactName.firstName).to.be.undefined
        expect(customer.phone).to.equal(phone)
        expect(customer.website).to.equal(website)
        expect(customer.legalId).to.equal(legalId)
        expect(customer.billingAddress.street).to.equal(billingAddress.street)
        expect(customer.billingAddress.town).to.equal(billingAddress.town)
        expect(customer.billingAddress.state).to.equal(billingAddress.state)
        expect(customer.billingAddress.zipCode).to.equal(billingAddress.zipCode)
        expect(customer.billingAddress.country).to.equal(billingAddress.country)
        expect(customer.shippingAddress.shippingStreet).to.equal(shippingAddress.shippingStreet)
        expect(customer.shippingAddress.shippingTown).to.equal(shippingAddress.shippingTown)
        expect(customer.shippingAddress.shippingState).to.equal(shippingAddress.shippingState)
        expect(customer.shippingAddress.shippingZipCode).to.equal(shippingAddress.shippingZipCode)
        expect(customer.shippingAddress.shippingCountry).to.equal(shippingAddress.shippingCountry)
        expect(customer.payTerms).to.equal(payTerms)

    })

    it('Should fail if customer not found', async () => {
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

        const customerToUpdate = await Customer.create({company: newCompany.id, name: customerName})

        const wrongCustId = new ObjectId()
        const newCustomerName = 'New Name'
        const customerEmail = 'spec@email.com'
        const phone = 666555444
        const website = 'www.specweb.com'
        const legalId = '123123123-X'
        const billingAddress = {
            street: 'Spec street',
            town: 'Spec Town',
            state: 'Spec State',
            zipCode: 'Spec zipCode',
            country: 'Spec country',
        }
        const shippingAddress = {
            shippingStreet: 'S Spec Street',
            shippingTown: 'S spec Town',
            shippingState: 'S spec State',
            shippingZipCode: 'S spec ZipCode',
            shippingCountry: 'S spec country',
        }
        const payTerms = '30 days'
        await expect(updateCustomer(wrongCustId, newCompany.id, {name: newCustomerName, email: customerEmail, phone, website, legalId, billingAddress, shippingAddress, payTerms})).to.eventually.be.rejectedWith(`Customer with ID ${wrongCustId} not found or not belong to company with ID ${newCompany.id}`).and.be.an.instanceOf(NotFoundError)
        

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

    after(async () => {
        await Promise.all([User.deleteMany(), Company.deleteMany()])
        disconnect()
    })
})