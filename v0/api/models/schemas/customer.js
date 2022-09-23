const { Schema, Types: { ObjectId } } = require('mongoose')

const customer = new Schema({
    company: {
        type: ObjectId,
        required: true,
        ref: 'Company'
    },

    name: {
        required: true,
        type: String
    },

    contactName: {
        firstName: {
            type: String,
        },
        lastName: {
            type: String
        },
    },

    email: {
        type: String,
    },

    phone: {
        type: Number
    },

    website: {
        type: String
    },

    legalId: {
        type: String
    },

    billingAddress: {
        street: {
            type: String,
            default : ''
        },
        town: {
            type: String,
            default : ''
        },
        state: {
            type: String,
            default : ''
        },
        zipCode: {
            type: String,
            default : ''
        },
        country: {
            type: String,
            default : ''
        },
    },

    shippingAddress: {
        shippingStreet: {
            type: String,
            default : ''
        },
        shippingTown: {
            type: String,
            default : ''
        },
        shippingState: {
            type: String,
            default : ''
        },
        shippingZipCode: {
            type: String,
            default : ''
        },
        shippingCountry: {
            type: String,
            default : ''
        },
    },

    payTerms: {
        type: String,
        // TODO -> REF TO ANOTHER COLLECTION WITH TERMS
    }

    // TODO??? Account Number // Other settings: "Default Sales account / Default Discount / Credit Limit"
})

module.exports = customer
