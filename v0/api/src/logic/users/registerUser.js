const { User, Company } = require('../../models')
const { DuplicityError, NotFoundError, FormatError } = require('errors')
const { validateEmail, validatePassword, validateRole } = require('validators')
const { Types: { ObjectId } } = require('mongoose')

function registerUser(name, lastName, email, password, companyId, role) {
    validateEmail(email)
    validatePassword(password)
    validateRole(role)
    if (!(ObjectId.isValid(companyId))) throw new FormatError('Company ID is not valid');

    return (async () => {
        
        const found = await User.findOne({ email })

        if (found) throw new DuplicityError(`Email ${email} is already on use`)

        const companyFound = await Company.findById(companyId)

        if (!companyFound) throw new NotFoundError(`Company with ID ${companyId} not found`)

        const user = await User.create({ name, lastName, email, password, company: companyId, role })

        companyFound.users.push(user.id)
        companyFound.save()
    })()
}

module.exports = registerUser