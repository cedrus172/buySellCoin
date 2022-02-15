const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted: { /* can declare property type with an object like this because we need 'default' */
        type: Date,
        default: new Date()
    }
});
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

BlogPost.create({ title: 'trieu hoang', body: 'ccaccac' }, function(err, result) {
    if (err) {
        throw err;
    }
    console.log(result);
})

BlogPost.find({}, function(err, result) {
    console.log(result);
})