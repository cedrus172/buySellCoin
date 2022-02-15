const UserModel = require('../model/User');

module.exports = (req, res, next) => {
    UserModel.findById(req.session.userId, (err, user) => {
        console.log(req.session.userId, user, "hehe");
        if (err || !user) return res.redirect('/user/login');
        next();
    })
}