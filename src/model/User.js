const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const saltRounds = 10;

const UserSchema = new Schema({
    username: String,
    password: String,
    usd: mongoose.SchemaTypes.Decimal128,
    levelstaff: Number,
    coin: {
        type: Array,
        default: []
    }
})

UserSchema.pre('save', function(next) {
    let user = this;
    console.log(user, this);
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if (err) console.error(err);
        console.log(hash);
        user.password = hash;
        next();
    });
})

// export model
const User = mongoose.model('User', UserSchema);

module.exports = User;