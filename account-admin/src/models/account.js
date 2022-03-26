const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    date_of_birth: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    account_balance: {
        type: Number,
        required: true
    }
})

module.exports = Account = mongoose.model("Account", AccountSchema)