const express = require('express');
const route = express.Router();
const multer = require('multer');
const upload = multer();

const userController = require('../controllers/userController');

//User 
route.post('/register', upload.none(), userController.userRegister);
route.post('/login', upload.none(), userController.userLogin);

route.get('/profile', userController.getUserInfo);

route.post('/transfer', upload.none(), userController.transferUsd)

module.exports = route;