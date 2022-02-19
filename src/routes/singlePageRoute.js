const express = require('express');
const route = express.Router();


const userController = require('../controllers/userController');


route.get('/register', (req, res) => {
    if (req.session.userId == null)
        res.render("./singlePage/register");
    else
        res.redirect("/");
});

route.get('/login', (req, res) => {
    if (req.session.userId == null)
        res.render("./singlePage/login");
    else
        res.redirect("/");
});

route.get('/transfer', (req, res) => {
    if (req.session.userId == null)
        res.render("./singlePage/login");
    else
        res.render("./transfer", {
            userid: req.session.userId,
            username: req.session.username,
            levelStaff: req.session.levelStaff,
            usd: req.session.usd
        })
});


route.get('/logout', userController.userLogout);

module.exports = route;