const express = require('express');
const route = express.Router();
const priceController = require('../controllers/priceController');


route.get('/list/:code', priceController.getPriceByCode);

module.exports = route;