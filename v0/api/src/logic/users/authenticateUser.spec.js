require('dotenv').config()
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const chai = require('chai')
const chaiaspromise = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiaspromise)
const authenticateUser = require('./authenticateUser')
const { AuthError, RegexError, NotFoundError } = require('errors')
const { User, Company } = require('../../models/')
const { env: { MONGO_URL_TEST } } = process


describe('authenticateUser', () => {

    before(() => connect(MONGO_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Company.deleteMany()]))

    it('Suceeds authenticating on existing user', () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'

        const companyName = 'Company Name'

        return (async () => {
            const company = await Company.create({ name: companyName })
            await User.create({ name, lastName, email, password, company: company.id, role })

            const { userId, companyId } = await authenticateUser(email, password)
            expect(userId).to.be.a('string')
            expect(companyId).to.be.instanceof(ObjectId)
            expect(companyId.toString()).to.equal(company.id)
        })()
    })

    it('Fails(AUTH Error) if credentials are wrong on existing user', () => {

        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'

        const companyName = 'Company Name'

        return (async () => {
            const company = await Company.create({ name: companyName })
            await User.create({ name, lastName, email, password, company: company.id, role })


            await expect(authenticateUser(email, 'wrongPass123!')).to.eventually.be.rejectedWith('Email and/or password wrong')
                .and.be.an.instanceOf(AuthError)
        })()

    })

    it('Fails(Throw Mail Regex Error) if mail format is wrong on existing user', () => {
        const name = 'SpecTesting'
        const lastName = 'SpecLastName'
        const email = 'spec@testing.com'
        const password = '123123123Aa!'
        const role = 'admin'

        const companyName = 'Company Name'

        return (async () => {
            const company = await Company.create({ name: companyName })
            await User.create({ name, lastName, email, password, company: company.id, role })

            expect(() => authenticateUser('wrong@wrong...es', password)).to.throw(RegexError, 'Email is not valid')
        })()

    })

    it('Fails(Throw NotFoundError) if user does not exist', async () => {

        await expect(authenticateUser('wrong@wrong.es', 'wrongPass123!')).to.eventually.be.rejectedWith('Email and/or password wrong')
            .and.be.an.instanceOf(NotFoundError)

    })


    after( async () => {
        await Promise.all([User.deleteMany(), Company.deleteMany()])
        disconnect()
    })
})