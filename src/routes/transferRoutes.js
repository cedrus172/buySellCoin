const transferController = require('../controllers/transferController');
const express = require('express');
const route = express.Router();

route.get('/list/all', transferController.getAllTransfer);

module.exports = route;