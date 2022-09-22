const { Schema } = require('mongoose')

const blacklist = new Schema({

    token: {
        type: String,
        required: true,   
    },

    blackListedAt: {
        type: Date,
        default : Date.now
    },

    expiresAt: {
        type: Date,
        expires: 3660
    }
})

module.exports = blacklist