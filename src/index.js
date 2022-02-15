require('./config/db.config');
const express = require('express');
const app = express();
const port = process.env.PORT || 3301;
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes');
const apiRoute = require('./routes/apiRoutes');
const expressSession = require('express-session');

const checkAuth = require('./middleware/auth.js');

const http = require('http');
const sv = http.createServer(app);
const io = require('socket.io')(sv, {
    cors: {
        origin: '*',
    },
    allowEIO3: true
});

require('./socketIO/handle')(io);

global.loggedIn = null;

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressSession({
    secret: 'secret'
}))

app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
})

app.set('view engine', "ejs");
app.set('views', "./views");

app.get('/', checkAuth, (req, res) => {
    res.render('index', {
        username: req.session.username,
        levelStaff: req.session.levelStaff
    });
});

app.use('/user', userRoute);

app.use('/api', apiRoute);

function updatePriceListToClient(data) {
    io.emit('priceList', data);
}
require('./managers/CoinMgr')(updatePriceListToClient);



sv.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});