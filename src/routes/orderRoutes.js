const express = require('express');
const route = express.Router();
const orderController = require('../controllers/orderController');
route.get('/buy/:code', (req, res) => {
    res.render('orderBuy', {
        code: req.params.code,
        username: req.session.username,
        levelStaff: req.session.levelStaff,
        usd: req.session.usd
    });
});

route.get('/sell/:code', (req, res) => {
    res.render('orderSell', {
        code: req.params.code,
        username: req.session.username,
        levelStaff: req.session.levelStaff,
        usd: req.session.usd
    });
});


//API
route.post('/buy', orderController.buyCoin);
route.post('/sell', orderController.sellCoin);

module.exports = route;