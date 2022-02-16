const express = require('express');
const route = express.Router();
const coinController = require('../controllers/coinController');
const checkAdmin = require('../middleware/isadmin');

route.post('/new', checkAdmin, coinController.newCoin);

route.get('/delete/:code', checkAdmin, coinController.deleteCoinByCode);

route.get('/code/:code', checkAdmin, coinController.getCoinByCode);

route.post('/update', checkAdmin, coinController.updateCoinByCode);

route.get('/list', coinController.getListCoin);


module.exports = route;