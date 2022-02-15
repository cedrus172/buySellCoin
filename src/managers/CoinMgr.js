const coinController = require('../controllers/coinController');
const CoinModel = require('../model/Coin');

let listCoin = [];
const updateCoin = (callback) => {
    CoinModel.find({}, function(error, coins) {
        if (error) throw error;
        if (coins) {
            listCoin = [];
            coins.forEach((coin) => {
                let code = coin.code;
                let name = coin.name;
                let price = coin.price;
                let lastTypeUpdate = coin.lastTypeUpdate;
                listCoin.push({ code: code, name: name, price: parseFloat(price), lastTypeUpdate: lastTypeUpdate });
            })
            listCoin.forEach((coin) => {
                let code = coin.code;
                let currentPrice = coin.price;
                let random = Math.floor(Math.random() * 10);
                let type = Math.floor(Math.random() * 100) < 50 ? 0 : 1;
                let newPrice = type === 0 ? currentPrice - random : currentPrice + random;
                let lastTypeUpdate = newPrice >= currentPrice ? 1 : 0;
                updatePriceByCode(newPrice, code, lastTypeUpdate);
                listCoin.find(a => a.code == code).price = newPrice;
                listCoin.find(a => a.code == code).lastTypeUpdate = lastTypeUpdate;

            })
            callback(listCoin);

        } else {
            console.log('Not found Coin');
        }
    })
}
const init = (callback) => {

    setInterval(() => {
        updateCoin(callback);
    }, 3000);
}



const updatePriceByCode = (price, code, lastTypeUpdate) => {
    CoinModel.updateOne({ code: code }, { code: code, price: price, lastTypeUpdate: lastTypeUpdate }, function(err, result) {
        if (err) throw err;
    })
}

module.exports = init;