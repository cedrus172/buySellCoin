const express = require('express');
const route = express.Router();
const coinController = require('../controllers/coinController');

route.post('/new', coinController.newCoin);

route.get('/code/:code', coinController.getCoinByCode);

route.post('/update', coinController.updateCoinByCode);

route.get('/list', coinController.getListCoin);
module.exports = route;