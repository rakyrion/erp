const { Schema, Types: { ObjectId } } = require('mongoose')

const estimate = new Schema({
    company: {
        type: ObjectId,
        required: true,
        ref: 'Company'
    },

    estimateNumber: {
        type: String,
        required: true
    },

    customer: {
        refId: {
            type: ObjectId,
            ref: 'Customer',
            required: true
        },
        name: {
            required: true,
            type: String
        },

        billingAddress: {
            street: {
                type: String,
                default: ''
            },
            town: {
                type: String,
                default: ''
            },
            state: {
                type: String,
                default: ''
            },
            zipCode: {
                type: String,
                default: ''
            },
            country: {
                type: String,
                default: ''
            },
        },

        shippingAddress: {
            shippingStreet: {
                type: String,
                default: ''
            },
            shippingTown: {
                type: String,
                default: ''
            },
            shippingState: {
                type: String,
                default: ''
            },
            shippingZipCode: {
                type: String,
                default: ''
            },
            shippingCountry: {
                type: String,
                default: ''
            },
        },

        email: {
            type: String,
            /* required: true */
        }
    },

    terms: {
        type: String,
        required: true
        // TODO, HOW TO REF ANOTHER COLLECTIONS ( TODO ) AND MAKE ONLY OPTIONS AVAILABLE FROM THAT
    },

    estimateDate: {
        type: Date,
        required: true
    },

    products: [{
        id: {
            type: ObjectId,
            ref: 'InventoryItem',
            required: true
        },
        name: {
            type: String,
            required: true,
        },

        description: {
            type: String
        },

        amount: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
            required: true
        }
    }]
    // TODO, HOW TO REF / SET RULES TO GET ARRAY OF PRODUCTS WITH ITS VALUES(QTY, PRICE, TAX...) ??
    ,

    totalAmount: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        required: true,
        enum: ['accepted', 'rejected', 'pending'],
        default: 'pending'
    }
})

module.exports = estimate