const UserModel = require('../model/User');
const bcrypt = require('bcrypt');
exports.userRegister = function(req, res, next) {
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

exports.userLogin = function(req, res, next) {
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

exports.updateUsdUser = function(params) {
    const userid = params.id;
    UserModel.updateOne({ _id: userid }, { usd: params.usd.toFixed(2) }, (err, user) => {
        if (err) throw err;
        if (user.modifiedCount) {
            console.log('update user success', userid);
        }
    });
}

exports.addCoinToUser = function(id, code, amount) {
    UserModel.findById(id, (err, user) => {
        if (err) throw err;
        if (user) {
            let findCoin = user.coin.find(a => a.code == code);
            if (user.coin.length == 0) {
                console.log('create coin in userid ', id);
                let coin = [];
                coin.push({ code: code, amount: amount });
                UserModel.updateOne({ _id: id }, { coin: coin }, (err, user) => {
                    console.log(user);
                });
            } else if (!findCoin) {
                let coins = user.coin;
                coins.push({ code: code, amount: parseFloat(amount) });
                UserModel.updateOne({ _id: id }, { coin: coins }, (err, user) => {
                    console.log(user);
                });
            } else {
                let coins = user.coin;
                coins.forEach((coin) => {
                    if (coin.code == code) {
                        let coinAfterFind = parseFloat(coin.amount) + parseFloat(amount);
                        coin.amount = coinAfterFind;
                    }
                })
                console.log(coins);
                UserModel.updateOne({ _id: id }, { coin: coins }, (err, user) => {
                    console.log(user);
                });
            }
        } else {
            console.log('not found user');
        }
    })
}

exports.removeCoinFromUser = function(id, code, amount) {
    UserModel.findById(id, (err, user) => {
        if (err) throw err;
        if (user) {
            let coins = user.coin;
            let amountCoin = parseFloat(coins.find(a => a.code == code).amount);
            let coinAfter = parseFloat(amountCoin - amount);
            coins.find(a => a.code == code).amount = coinAfter;
            UserModel.updateOne({ _id: id }, { coin: coins });
        } else {
            console.log('not found user');
        }
    })
}

exports.userLogout = function(req, res) {
    req.session.destroy(() => {
        res.redirect('/');
    })
}