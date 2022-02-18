const express = require('express');
const route = express.Router();
const coinController = require('../controllers/coinController');
const checkAdmin = require('../middleware/isadmin');

route.post('/new', checkAdmin, coinController.newCoin);

route.get('/delete/:code', checkAdmin, coinController.deleteCoinByCode);

route.get('/code/:code', checkAdmin, coinController.getCoinByCode);

route.post('/update', checkAdmin, coinController.updateCoinByCode);

route.get('/list', coinController.getListCoin);

route.get('/price/:code', async(req, res) => {
    let code = req.params.code.toUpperCase();
    let coinPrice = await coinController.getPriceBySymbol(code)
    if (coinPrice == 0) {
        res.json({ message: 'Coin not found', type: -1 })
    } else if (coinPrice.data) {
        if (coinPrice.data.symbol) {
            res.json({ message: 'OK', price: coinPrice.data.price, type: 1 });
        } else {
            res.json({ message: coinPrice.data.msg, type: -1 })
        }
    }
})


module.exports = route;