const express = require('express');
const route = express.Router();
const orderController = require('../controllers/orderController');
const UserModel = require('../model/User')
route.get('/buy/:code', (req, res) => {
    UserModel.findById(req.session.userId, (err, user) => {
        let coinBalance = 0.0;
        let findCoin = user.coin.find(a => a.code == req.params.code.toUpperCase());
        if (findCoin)
            coinBalance = findCoin.amount;
        res.render('orderBuy', {
            userid: req.session.userId,
            code: req.params.code,
            username: req.session.username,
            levelStaff: req.session.levelStaff,
            usd: req.session.usd,
            coinBalance: coinBalance
        });
    })
});

route.get('/sell/:code', (req, res) => {
    UserModel.findById(req.session.userId, (err, user) => {
        let coinBalance = 0.0;
        let findCoin = user.coin.find(a => a.code == req.params.code.toUpperCase());
        if (findCoin)
            coinBalance = findCoin.amount;
        res.render('orderSell', {
            userid: req.session.userId,
            code: req.params.code,
            username: req.session.username,
            levelStaff: req.session.levelStaff,
            usd: req.session.usd,
            coinBalance: coinBalance
        });
    })

});


//API
route.post('/buy', orderController.buyCoin);
route.post('/sell', orderController.sellCoin);
route.get('/list/buy/:code', orderController.getOrdersBuyByCode);
route.get('/list/sell/:code', orderController.getOrdersSellByCode);


module.exports = route;