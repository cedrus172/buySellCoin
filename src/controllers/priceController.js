const PriceModel = require('../model/Price');


exports.insertNewPrice = function(price) {
    PriceModel.create(price, (err, price) => {
        if (err) throw err;
        if (price) {
            console.log('updated a price', price);
        }
    })
}