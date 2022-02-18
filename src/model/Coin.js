const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;
const CoinSchema = new Schema({
    name: String,
    code: String,
    price: {
        type: Number,
    },
    createDate: { /* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date()
    },
    lastTypeUpdate: {
        type: Number,
        default: 1
    },
    imgURL: {
        type: String,
        default: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png'
    }
})

// export model
const Coin = mongoose.model('Coin', CoinSchema);

module.exports = Coin;