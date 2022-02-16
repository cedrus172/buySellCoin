const UserModel = require('../model/User');

module.exports = (req, res, next) => {
    UserModel.findById(req.session.userId, (err, user) => {
        if (err || !user) return res.redirect('/user/login');
        req.session.usd = user.usd;
        next();
    })
}