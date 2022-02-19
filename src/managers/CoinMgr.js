const coinController = require('../controllers/coinController');
const CoinModel = require('../model/Coin');
const priceController = require('../controllers/priceController');

let closePrice = [];
let openPrice = [];
let lowPrice = [];
let highPrice = [];
const DEFAULT_COUNT_DOWN = 20;
let countDown = DEFAULT_COUNT_DOWN;
Array.prototype.forEachAsync = async function(fn) {
    for (let t of this) { await fn(t) }
}
const updateCoin = () => {
    CoinModel.find({}, async function(error, coins) {
        if (error) throw error;
        if (coins) {
            countDown--;
            let listCoin = [];
            let listCoinPublish = [];
            coins.forEach((coin) => {
                let code = coin.code;
                let name = coin.name;
                let price = coin.price;
                let lastTypeUpdate = coin.lastTypeUpdate;
                let imgURL = coin.imgURL;
                listCoin.push({ code: code, name: name, price: parseFloat(price), lastTypeUpdate: lastTypeUpdate, imgURL: imgURL });
            })
            await listCoin.forEachAsync(async(coin) => {
                let code = coin.code;
                let coinInfo = await coinController.getPriceBySymbol(code);
                coinInfo = coinInfo.data.RAW[code]['USD'];
                if (!lowPrice[`${code}`])
                    lowPrice[`${code}`] = 100000000000;
                if (!highPrice[`${code}`])
                    highPrice[`${code}`] = 0;

                let name = coin.name;
                let currentPrice = coin.price;
                let imgURL = coin.imgURL;
                let newPrice = parseFloat(coinInfo.PRICE);
                if (newPrice < lowPrice[`${code}`])
                    lowPrice[`${code}`] = newPrice;
                if (newPrice > highPrice[`${code}`])
                    highPrice[`${code}`] = newPrice;
                let lastTypeUpdate = newPrice >= currentPrice ? 1 : 0;
                updatePriceByCode(newPrice, code, lastTypeUpdate);
                listCoin.find(a => a.code == code).price = newPrice;
                listCoin.find(a => a.code == code).lastTypeUpdate = lastTypeUpdate;

                listCoinPublish.push({ code: code, name: name, price: parseFloat(newPrice), oldPrice: parseFloat(currentPrice), lastTypeUpdate: lastTypeUpdate, imgURL: imgURL });
            });
            if (countDown == 0) {
                listCoinPublish.forEach((coin) => {
                    let openPri = 0;
                    let code = coin.code;
                    if (openPrice[`${code}`])
                        openPri = openPrice[`${code}`];
                    else if (closePrice[`${code}`])
                        openPri = closePrice[`${code}`];
                    closePrice[coin.code] = coin.price;
                    let coinData = { name: coin.name, code: coin.code, open: openPri, low: lowPrice[coin.code], high: highPrice[coin.code], close: closePrice[coin.code], date: Date.now() }
                    if (coinData.open != 0) {
                        priceController.insertNewPrice(coinData);
                        global.io.emit(`rerender-${code}`, 'rerender');
                    }
                    lowPrice[`${code}`] = 100000000000;
                    highPrice[`${code}`] = 0;
                    openPrice[`${code}`] = coin.price;
                });
                countDown = DEFAULT_COUNT_DOWN;
            }
            global.io.emit('priceList', listCoinPublish);
        } else {
            console.log('Not found Coin');
        }
    })
}
const init = () => {

    setInterval(() => {
        updateCoin();
    }, 3000);
}



const updatePriceByCode = (price, code, lastTypeUpdate) => {
    CoinModel.updateOne({ code: code }, { code: code, price: price, lastTypeUpdate: lastTypeUpdate }, function(err, result) {
        if (err) throw err;
    })
}

module.exports = init;