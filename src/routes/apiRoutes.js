const express = require('express');
const route = express.Router();

const multer = require('multer');
const upload = multer();

const userController = require('../controllers/userController');
const coinController = require('../controllers/coinController');

//User 
route.post('/user/register', upload.none(), userController.userRegister);
route.post('/user/login', upload.none(), userController.userLogin);

//Coin
route.get('/coin/list', coinController.getListCoin);




module.exports = route;