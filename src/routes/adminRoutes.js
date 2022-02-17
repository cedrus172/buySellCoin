const express = require('express');
const route = express.Router();


route.get('/coinManagers', (req, res) => {
    res.render("./admin/coinManagers", {
        username: req.session.username,
        levelStaff: req.session.levelStaff
    });

});

module.exports = route;