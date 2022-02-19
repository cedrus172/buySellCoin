const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransferSchema = new Schema({
    userFrom: String,
    userTo: String,
    amount: String,
    date: {
        type: Date,
        default: new Date()
    }
})

// export model
const Transfer = mongoose.model('Transfer', TransferSchema);

module.exports = Transfer;