const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    type: String,
    code: String,
    amount: String,
    total: String,
    date: {
        type: String,
        default: Math.floor(Date.now() / 1000)
    }
})

// export model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;