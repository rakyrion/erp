const { Schema, Types : { ObjectId } } = require('mongoose')

const user = new Schema({
    name:{
        type: String,
        required: true
    },

    lastName:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    company: {
        type: ObjectId,
        required: true,
        ref: 'Company'
    },

    role: {
        type: String,
        enum: ['admin', 'accountant', 'employee'],
        required: true
    },

    googleId:{
        type: String
    }

})

module.exports = user