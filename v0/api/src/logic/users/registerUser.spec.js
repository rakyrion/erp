require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const chai = require('chai')
const chaiaspromise = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiaspromise)
const registerUser = require('./registerUser')
const { DuplicityError, NotFoundError } = require('errors')
const { User, Company } = require('../../models/')
const { env: { MONGO_URL_TEST } } = process

describe('registerUser', () => {
    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Company.deleteMany()]))

    it('succeeds registering a new admin user', async () => {

        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'

        const companyName = 'Company Name'

        const company = await Company.create({ name: companyName })

        const result = await registerUser(name, lastName, email, password, company.id, role)
        expect(result).to.be.undefined

        const users = await User.find()
        expect(users).to.have.length(1)
        const [user] = users

        expect(user.name).to.equal(name)
        expect(user.lastName).to.equal(lastName)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)
        expect(user.role).to.equal(role)
        expect(user.company.toString()).to.equal(company.id)

    })

    it('Should fail if company does not exists', async() => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'

        const fakeCompanyId = new ObjectId()

        await expect (registerUser(name, lastName, email, password, fakeCompanyId, role)).to.eventually.be.rejectedWith(`Company with ID ${fakeCompanyId} not found`)
        .and.be.an.instanceOf(NotFoundError)

    })

    it('should fail when user already exists', async () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'

        const companyName = 'Company Name'

        const company = await Company.create({ name: companyName })

        const user = await User.create({ name, lastName, email, password, company: company.id, role })

        await expect(registerUser(name, lastName, email, password, company.id, role)).to.eventually.be.rejectedWith(`Email ${email} is already on use`).and.be.an.instanceOf(DuplicityError)
        const totalUsers = await User.find()
        expect(totalUsers).to.have.lengthOf(1)
    })

    after(() => disconnect())
})