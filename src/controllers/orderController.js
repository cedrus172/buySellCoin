const OrderModel = require('../model/Order');
const CoinModel = require('../model/Coin');
const UserModel = require('../model/User');
const userController = require('../controllers/userController');
const coinController = require('../controllers/coinController');

exports.buyCoin = function(req, res, next) {
    let code = req.body.code.toUpperCase();
    let amount = parseFloat(req.body.amount);
    CoinModel.findOne({ code: code }, function(err, coin) {
        if (err) throw err;
        if (coin) {
            let price = parseFloat(parseFloat(coin.price).toFixed(2));;
            let total = amount * price;
            UserModel.findById(req.session.userId, function(err, user) {
                if (err) throw err;
                if (user) {
                    let usd = user.usd;
                    if (total <= usd && usd > 0) {
                        let moneyAfter = usd - total;
                        let priceCoinAfter = price + total / 100;
                        userController.updateUsdUser({ id: req.session.userId, usd: moneyAfter });
                        userController.addCoinToUser(req.session.userId, code, amount);
                        coinController.updateCoinByCode2({ code: code, price: priceCoinAfter })
                        addOrder(req.session.userId, 'BUY', code, amount, total);
                        global.io.to(req.session.userId).emit('refreshHavingCoin', '');
                        res.json({ message: 'Buy success', type: 1, priceCoinAfter: priceCoinAfter, usdAfter: moneyAfter });
                    } else {
                        res.json({ message: 'Not enough balance to buy', type: -2 })
                    }
                } else {
                    res.json({ message: 'Buy fail', type: -3 });
                }
            })
        } else {
            res.json({ message: 'Error', type: -1 });
        }
    })
}

exports.sellCoin = function(req, res, next) {
    let code = req.body.code.toUpperCase();
    let amount = parseFloat(req.body.amount);
    CoinModel.findOne({ code: code }, function(err, coin) {
        if (err) throw err;
        if (coin) {
            let price = parseFloat(parseFloat(coin.price).toFixed(2));
            let total = amount * price;
            UserModel.findById(req.session.userId, function(err, user) {
                if (err) throw err;
                if (user) {
                    let coin = user.coin.find(a => a.code == code);
                    if (coin) {
                        let coinAmount = parseFloat(coin.amount);
                        if (coinAmount >= amount) {
                            let usdUser = parseFloat(parseFloat(user.usd).toFixed(2));
                            let usdAfter = usdUser + total;
                            let coinAfter = parseFloat(coinAmount - amount);

                            userController.updateCoinFromUser(req.session.userId, code, coinAfter);
                            userController.updateUsdUser({ id: req.session.userId, usd: usdAfter });
                            let priceCoinAfter = price - total / 100;
                            coinController.updateCoinByCode2({ code: code, price: priceCoinAfter })
                            addOrder(req.session.userId, 'SELL', code, amount, total);
                            global.io.to(req.session.userId).emit('refreshHavingCoin', '');
                            res.json({ message: 'Sell success', type: 1, usdAfter: usdAfter, coinAfter: coinAfter });
                        } else {
                            res.json({ message: 'Not have enough coin to sell', type: -11 });
                        }
                    } else {
                        res.json({ message: `You don't have ${code} Coin`, type: -21 });
                    }
                } else {
                    res.json({ message: 'buy fail', type: -3 });
                }
            })
        } else {
            res.json({ message: 'error', type: -1 });
        }
    })
}

exports.getOrdersBuyByCode = function(req, res, next) {
    let code = req.params.code.toUpperCase();
    OrderModel.find({ userId: req.session.userId, type: 'BUY', code: code }, function(err, orders) {
        if (err) throw err;
        if (orders) {
            res.send(orders);
        } else {
            res.json({});
        }
    })
}

exports.getOrdersSellByCode = function(req, res, next) {
    let code = req.params.code.toUpperCase();
    OrderModel.find({ userId: req.session.userId, type: 'SELL', code: code }, function(err, orders) {
        if (err) throw err;
        if (orders) {
            res.send(orders);
        } else {
            res.json({});
        }
    })
}

function addOrder(userId, type, code, amount, total) {
    OrderModel.create({ userId: userId, type: type, code: code, amount: amount, total: total }, (err, order) => {
        console.log(order);
    })
}