require('./config/db.config');
const express = require('express');
const app = express();
const port = process.env.PORT || 3301;
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes');
const singlePageRoute = require('./routes/singlePageRoute');
const coinRoute = require('./routes/coinRoutes');
const orderRoute = require('./routes/orderRoutes');
const priceRoute = require('./routes/priceRoutes');
const expressSession = require('express-session');

const checkAuth = require('./middleware/auth');
const checkAdmin = require('./middleware/isadmin');

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
global.io = io;
global.full_url = 'http://127.0.0.1:' + port + '/';

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

app.use('/user', singlePageRoute);
app.use('/order', checkAuth, orderRoute);
app.use('/api/coin', coinRoute);
app.use('/api/user', userRoute);
app.use('/api/price', checkAuth, priceRoute);
app.use('/api/order', checkAuth, orderRoute);

require('./managers/CoinMgr')();



sv.listen(port, () => {
    console.log(`App is listening at port ${port}`);
});