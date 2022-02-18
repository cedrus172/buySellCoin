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
    if (coinPrice.data.Response == 'Error') {
        res.json({ message: coinPrice.data.Message, type: -1 })
    } else if (coinPrice.data.RAW) {
        let infoCoin = coinPrice.data.RAW[code]['USD'];
        if (infoCoin.PRICE) {
            res.json({ message: 'OK', price: infoCoin.PRICE, imgURL: 'https://cryptocompare.com' + infoCoin.IMAGEURL, type: 1 });
        } else {
            res.json({ message: 'error', type: -1 })
        }
    }
})


module.exports = route;