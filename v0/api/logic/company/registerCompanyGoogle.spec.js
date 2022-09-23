require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const chai = require('chai')
const chaiaspromise = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiaspromise)
const registerCompanyGoogle = require('./registerCompanyGoogle')
const { DuplicityError } = require('errors')
const { User, Company } = require('../../models/')
const { env: { MONGO_URL_TEST } } = process

describe('registerCompanyGoogle', () => {
    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Company.deleteMany()]))

    it('succeeds registering a new company(creating automatically an admin user)', async () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const googleId = '123123123'


        const result = await registerCompanyGoogle(name, lastName, email, googleId)
        expect(result).to.be.undefined

        const companies = await Company.find()
        expect(companies).to.have.length(1)
        const [company] = companies

        const users = await User.find()
        expect(users).to.have.length(1)
        const [user] = users
        expect(company.name).to.equal(`${name}'s Company`)
        expect(company.admin.toString()).to.equal(user.id)
        expect(company.companyEmail).to.equal(email)
        expect(user.name).to.equal(name)
        expect(user.lastName).to.equal(lastName)
        expect(user.email).to.equal(email)
        expect(user.role).to.equal('admin')
        expect(user.company.toString()).to.equal(company.id)

    })

    it('Should fail if there is already a company registered with same email', async () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'

        const googleId = '123123123'

        await Company.create({name, lastName, companyEmail : email, password})

        await expect(registerCompanyGoogle(name, lastName, email, googleId)).to.eventually.be.rejectedWith(`Email ${email} is already on use`)
            .and.be.an.instanceOf(DuplicityError)

    })

    it('Should fail if there is already a user registered with same email', async () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'

        const userEmail = 'spec2@testing.com'
        const role = 'employee'

        const googleId = '123123123'

        const company = await Company.create({name, lastName, companyEmail : email, password})
        await User.create({name, lastName, email: userEmail, company: company.id, password, role})
        await expect(registerCompanyGoogle(name, lastName, userEmail, googleId)).to.eventually.be.rejectedWith(`Email ${userEmail} is already on use`)
            .and.be.an.instanceOf(DuplicityError)

    })

    // TODO INPUT VALIDATIONS ERROR (REGEX...)

    after( async () => {
        await Promise.all([User.deleteMany(), Company.deleteMany()])
        disconnect()
    })
})