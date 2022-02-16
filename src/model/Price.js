const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PriceSchema = new Schema({
    name: String,
    code: String,
    open: String,
    low: String,
    high: String,
    close: String,
    date: String
})

// export model
const Price = mongoose.model('Price', PriceSchema);

module.exports = Price;