const CoinModel = require('../model/Coin');
const PriceModel = require('../model/Price');
const axios = require('axios');

exports.newCoin = async function(req, res, next) {
    req.body.code = req.body.code.toUpperCase();
    CoinModel.findOne({ code: req.body.code }, async function(error, coin) {
        if (coin) {
            res.json({ message: "Your coin code already exists, please choose another code", type: -12 });
        } else {
            let coinPrice = await exports.getPriceBySymbol(req.body.code);
            if (coinPrice.data.Response == 'Error') {
                res.json({ message: coinPrice.data.Message, type: -1 })
            } else {
                let infoCoin = coinPrice.data.RAW[req.body.code]['USD'];
                let infoInsert = { name: req.body.name, code: req.body.code, price: infoCoin.PRICE, imgURL: 'https://cryptocompare.com' + infoCoin.IMAGEURL }
                CoinModel.create(infoInsert, (err, coin) => {
                    if (err) throw err;
                    if (coin) {
                        global.io.emit('addCoin', coin);
                        global.io.emit('notice', { type: "success", msg: `Admin just added new coin ${coin.name} : ${infoCoin.PRICE}` })
                        res.json({ message: 'Add coin success . Coin Price : ' + infoCoin.PRICE, type: 1 })
                    } else {
                        res.json({ message: "Create failed ", type: -11 });
                    }
                })
            }


        }
    });
}

exports.getPriceBySymbol = async(coin) => {
    try {
        let result = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin.toUpperCase()}&tsyms=USD`);
        return await result;
    } catch (error) {
        return 0.0;
    }
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
                PriceModel.deleteMany({ code: code }, function(error, result) {
                    if (error) throw error;
                })
                global.io.emit('removeCoin', code);
                global.io.emit('notice', { type: "error", msg: `Admin just deleted a coin ${detailCoin.name} : ${detailCoin.price}` })
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