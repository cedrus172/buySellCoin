const CoinModel = require('../model/Coin');


exports.newCoin = function(req, res, next) {
    req.body.code = req.body.code.toUpperCase();
    CoinModel.findOne({ code: req.body.code }, function(error, coin) {
        if (coin) {
            res.json({ message: "Your coin code already exists, please choose another code", type: -12 });
        } else {
            CoinModel.create(req.body, (err, coin) => {
                if (err) throw err;
                if (coin) {
                    global.io.emit('addCoin', coin);
                    res.json({ message: 'Add coin success', type: 1 })
                } else {
                    res.json({ message: "Create failed ", type: -11 });
                }
            })
        }
    });
}


exports.getCoinByCode = function(req, res, next) {
    CoinModel.findOne({ code: req.params.code }, function(error, detailCoin) {
        if (error) throw error;
        if (detailCoin) {
            res.send(detailCoin);
        } else {
            res.json({ result: "Not found this code !" });
        }
    })
}

exports.deleteCoinByCode = function(req, res, next) {
    const code = req.params.code.toUpperCase();
    CoinModel.findOne({ code: code }, function(error, detailCoin) {
        if (error) throw error;
        if (detailCoin) {
            CoinModel.deleteOne({ code: code }, function(error, result) {
                global.io.emit('removeCoin', code);
                res.json({ message: 'Deleted', type: 1 })
            })
        } else {
            res.json({ message: "Not found code : " + code, type: -1 });
        }
    })
}

exports.getListCoin = function(req, res, next) {
    CoinModel.find({}, function(error, detailCoin) {
        if (error) throw error;
        if (detailCoin) {
            res.send(detailCoin);
        } else {
            res.json({ result: "Not found !" });
        }
    })
}


exports.updateCoinByCode = function(req, res, next) {
    req.body.code = req.body.code.toUpperCase();
    CoinModel.updateOne({ code: req.body.code }, req.body, function(err, result) {
        if (err) throw err;
        if (result) {
            res.send(result);
        } else {
            res.json({ result: "Update failed !" });
        }
    })
}

exports.updateCoinByCode2 = function(params) {
    let code = params.code.toUpperCase();
    CoinModel.updateOne({ code: code }, params, function(err, result) {
        if (err) throw err;
    })
}