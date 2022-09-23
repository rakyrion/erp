require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const chai = require('chai')
const chaiaspromise = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiaspromise)
const authenticateGoogle = require('./authenticateGoogle')
const { AuthError, RegexError, NotFoundError } = require('errors')
const { User, Company } = require('../../models/')
const { env: { MONGO_URL_TEST } } = process


describe('authenticateGoogle', () => {

    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Company.deleteMany()]))

    it('Suceeds authenticating on existing user with googleId', () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'
        const googleId = '111222333'

        const companyName = 'Company Name'

        return (async () => {
            const company = await Company.create({ name: companyName })
            await User.create({ name, lastName, email, password, company: company.id, role, googleId })

            const { userId, companyId } = await authenticateGoogle(googleId)
            expect(userId).to.be.a('string')
            expect(companyId).to.be.instanceof(ObjectId)
            expect(companyId.toString()).to.equal(company.id)
        })()
    })

    it('Fails if googleId does not match any user', () => {

        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'
        const googleId = '111222333'

        const companyName = 'Company Name'

        return (async () => {
            const company = await Company.create({ name: companyName })
            await User.create({ name, lastName, email, password, company: company.id, role, googleId })


            await expect(authenticateGoogle('WrongId')).to.eventually.be.rejectedWith('Account not registered with google')
                .and.be.an.instanceOf(NotFoundError)
        })()

    })

    after( async () => {
        await Promise.all([User.deleteMany(), Company.deleteMany()])
        disconnect()
    })
})