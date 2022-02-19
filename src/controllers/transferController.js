const TransferModel = require('../model/Transfer');

exports.getTransferFrom = function(req, res, next) {
    let userFrom = req.body.username.toLowerCase();
    TransferModel.find({ username: userFrom }, (err, user) => {
        if (err) throw err;
        if (user) {
            res.json({ type: 1, data: user });
        } else {
            res.json({ type: -1, data: user });
        }
    })
}

exports.getTransferTo = function(req, res, next) {
    let userTo = req.body.username.toLowerCase();
    TransferModel.find({ username: userTo }, (err, user) => {
        if (err) throw err;
        if (user) {
            res.json({ type: 1, data: user });
        } else {
            res.json({ type: -1, data: user });
        }
    })
}

exports.getAllTransfer = function(req, res, next) {
    let username = req.session.username.toLowerCase();
    TransferModel.find({ $or: [{ userFrom: username }, { userTo: username }] }, (err, transfers) => {
        if (err) throw err;
        if (transfers) {
            res.json({ type: 1, data: transfers })
        } else {
            res.json({ type: -1, message: 'Not found transfers' });
        }
    })
}

exports.createTransferLog = function(data) {
    console.log(data);
    TransferModel.create({ userFrom: data.userFrom, userTo: data.userTo, amount: data.amount }, (err, transfer) => {
        if (err) throw err;
        if (transfer) {
            console.log(`created a log transfer success`);
        } else {
            console.log(`create a log transfer failed`);
        }
    });
}