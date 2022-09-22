const { Schema, Types: {ObjectId} } = require('mongoose')

const inventoryItem = new Schema({
    company: {
        type: ObjectId,
        required: true,
        ref: 'Company'
    },

    name: {
        type: String,
        required: true,
    },

    sku: {
        type: String,
    },

    category: {
        type: String,
        required: true,
        default: 'uncategorized'
    },

    cost: {
        type: Number,
        default : ''
    },

    // cost: Number,

    averageCost: {
        type: Number,
        default: ''
    },

    description:{
        type: String,
        default: ''
    },

    minStock: {
        type: Number,
        default: ''
    },

    stock : {
        type: Number,
        default: ''
    }

})

module.exports = inventoryItem