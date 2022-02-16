const PriceModel = require('../model/Price');


exports.insertNewPrice = function(price) {
    PriceModel.create(price, (err, price) => {
        if (err) throw err;
        if (price) {
            console.log('updated a price', price);
        }
    })
}

exports.getPriceByCode = function(req, res) {
    let code = req.params.code.toUpperCase();
    PriceModel.find({ code: code }, (err, prices) => {
        if (err) throw err;
        prices ? res.send(prices) : res.json({ message: 'not found', ok: 'false' });
    })
}