const { Schema, Types : {ObjectId} } = require('mongoose')

const company = new Schema({
    name:{
        type: String,
    },

    legalName: {
        type: String
    },

    legalId: {
        type: String,
    },

    admin: {
        type: ObjectId,
        ref: 'User'
        // How to make it required. I need company to create user and I need user to create company??
    },

    users: [{
        type: ObjectId,
        ref: 'User'
    }],

    telephone: {
        type: Number
    },

    companyEmail : {
        type: String
    },

    customerFacingEmail: {
        type: String
    },

    postalAddress: {
        street : {
            type : String,
        },
        town : {
            type : String
        },
        state : {
            type: String
        },
        zipCode: {
            type: String
        },
        country : {
            type : String
        },
    },

    physicalAddress: {
        street : {
            type : String
        },
        town : {
            type : String
        },
        state : {
            type: String
        },
        zipCode: {
            type: String
        },
        country : {
            type : String
        },
    },

    sector: {
        type: String,
    },

    website: {
        type: String
    }

})

module.exports = company