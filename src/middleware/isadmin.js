const UserModel = require('../model/User');

module.exports = (req, res, next) => {
    UserModel.findById(req.session.userId, (err, user) => {
        if (err) throw err;
        if (user)
            user.levelstaff > 0 ? next() : res.json({ message: 'not have permission', type: '-3' });
        else {
            res.json({ message: 'not have permission', type: '-3' });
        }
    })
}