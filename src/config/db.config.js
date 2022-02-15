const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cgo', { useNewUrlParser: true }, (err) => {
    if (err) console.error(err);
    console.log("Connect to databases");
});