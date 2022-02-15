const UserModel = require('../model/User');
const bcrypt = require('bcrypt');
exports.userRegister = async function(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    UserModel.findOne({ username: req.body.username }, function(err, user) {
        if (err) throw err;
        if (user) {
            res.json({ message: 'Username aleady exists', type: -2 })
        } else {
            const { username, password } = req.body;
            const { usdDefault, levelStaff } = { usdDefault: 10000.00, levelStaff: 0 };
            UserModel.create({ username: username, password: password, usd: usdDefault, levelstaff: levelStaff }, (err, user) => {
                if (err) throw err;
                if (user) {
                    req.session.userId = user._id;
                    req.session.username = user.username;
                    req.session.levelStaff = user.levelstaff;
                    res.json({ message: 'Register success', type: 1, id: user._id })
                }
            })
        }
    })

}

exports.userLogin = async function(req, res, next) {
    const { username, password } = req.body;
    UserModel.findOne({ username: username.toLowerCase() }, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    req.session.userId = user._id;
                    req.session.username = user.username;
                    req.session.levelStaff = user.levelstaff;

                    res.json({ message: 'You have successfully logged in!', type: 1, id: user._id })
                } else {
                    res.json({ message: 'Login failed', type: -1 })
                }
            })
        } else {
            res.json({ result: 'Login fail', type: -1 })
        }
    })
}

exports.userLogout = function(req, res) {
    req.session.destroy(() => {
        res.redirect('/');
    })
}