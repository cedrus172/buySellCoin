const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    userId: String,
    type: String,
    code: String,
    amount: String,
    total: String,
    date: {
        type: Date,
        default: new Date()
    }
})

// export model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;