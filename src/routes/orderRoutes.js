const express = require('express');
const route = express.Router();
const coinController = require('../controllers/coinController');


route.get('/buy/:code', (req, res) => {
    res.render('orderBuy', {
        code: req.params.code,
        username: req.session.username,
        levelStaff: req.session.levelStaff
    });
});

route.get('/sell/:code', (req, res) => {
    res.render('orderSell', { code: req.params.code });
});

module.exports = route;