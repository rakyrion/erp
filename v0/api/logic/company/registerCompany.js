const { User, Company } = require('../../models')
const { DuplicityError  } = require('errors')
const { validateEmail, validatePassword, validateRole } = require('validators')

function registerCompany(name, lastName, email, password) {
    //TODO validate name
    validateEmail(email)
    validatePassword(password)
   

    return (async () => {
        const found = await User.findOne({ email })
        const foundCompany = await Company.findOne({ companyEmail: email })

        if (found || foundCompany) throw new DuplicityError(`Email ${email} is already on use`)

        const newCompany = await Company.create({name: `${name}'s Company`, companyEmail: email})
        const newUser = await User.create({ name, lastName, email, password, company: newCompany.id, role : 'admin' })
        newCompany.admin = newUser.id
        newCompany.users.push(newUser.id)
        await newCompany.save()
    })()
}

module.exports = registerCompany