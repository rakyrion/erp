const { Schema, Types: { ObjectId } } = require('mongoose')

const invoice = new Schema({
    company: {
        type: ObjectId,
        required: true,
        ref: 'Company'
    },

    invoiceNumber: {
        type: String,
        required: true
    },

    customer: {  // PUEDO HACER UN REF A UN ID DE LA DB CUSTOMERS Y SACAR TODOS LOS DATOS DE AHI? -> NO TENDRIA SENTIDO PORQUE EN UNA FACTURA EL CLIENTE PODRIA TENER ALGUN DATO DIFERENTE A LO CORRESPONDIENTE EN SU DB
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
            required: true
        }
    },

    terms: {
        type: String,
        required: true
        // TODO, HOW TO REF ANOTHER COLLECTIONS ( TODO ) AND MAKE ONLY OPTIONS AVAILABLE FROM THAT
    },

    invoiceDate: {
        type: Date,
        required: true
    },

    dueDate: {
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
        },
        total: {
            type: Number,
            required: true
        }
    }],

    balance: {
        type: Number,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        required: true,
        enum: ['overdue', 'pending', 'paid'],
        default: 'pending'
    }
})

module.exports = invoice