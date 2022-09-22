const { User, Company } = require('../../models')
const { DuplicityError  } = require('errors')
const { validateEmail, validatePassword } = require('validators')

function registerCompanyGoogle(name, lastName, email, googleId) {
    //TODO validate name && gogleId
    validateEmail(email)
   

    return (async () => {
        const found = await User.findOne({ email })
        const foundCompany = await Company.findOne({ companyEmail: email })

        if (found || foundCompany) throw new DuplicityError(`Email ${email} is already on use`)

        const newCompany = await Company.create({name: `${name}'s Company`, companyEmail: email})
        const password = '!Gl' + Math.floor(Math.random() * (999999999999 - 100000000000) + 100000000000)
        const newUser = await User.create({ name, lastName, email, password, company: newCompany.id, role : 'admin', googleId })
        newCompany.admin = newUser.id
        newCompany.users.push(newUser.id)
        await newCompany.save()
    })()
}

module.exports = registerCompanyGoogle