const showCoinList = async() => {
    let result = await API.getCoinList();
    result.forEach(data => {
        data.price = data.price;
        data.oldPrice = data.price;
    })
    tableCoinList.renderData(result);
    setHavingCoin();
}
let num = 0;
const titlePage = $('#titlePage');
document.title = titlePage.html();

const tableDataCoin = $('#tableCoinList');

const tableCoinList = {
    addRow: function(code, name, price, lastUpdate, actions, imgURL, oldPrice, number) {
        let content = `<tr id="row-${code}">
        <td>
        <div class="d-flex justify-content-start flex-column">
        <span class="text-dark fw-bolder text-hover-primary fs-6">${number}</span>
         </div>
        </td>
        <td>
        <div class="d-flex align-items-center">
        <div class="symbol symbol-45px me-5">
            <img src="${imgURL}" alt="" />
        </div>
        <div class="d-flex justify-content-start flex-column">
            <span class="text-dark fw-bolder text-hover-primary fs-6">${name}</span>
            <span class="text-muted fw-bold text-muted d-block fs-7">${code}</span>
        </div>
        </div>
        </td>
        <td id="price-${code}"><span class="text-${lastUpdate == 0 ? 'danger' : 'success'} fw-bolder text-hover-primary d-block fs-6">${price.toFixed(2)}</span></td>$</span></td>
        <td id="oldPrice-${code}"><span class="text-${lastUpdate == 0 ? 'danger' : 'success'} fw-bolder text-hover-primary d-block fs-6">${parseFloat(oldPrice).toFixed(2)}$</span></td>
        <td><span class="text-primary fw-bolder text-hover-primary d-block fs-6" id="having-${code}">0</span></td>
        <td><div class="d-flex justify-content-end flex-shrink-0">
        <a href="/order/buy/${code}" class="btn btn-sm btn-success me-2">BUY</a>
        <a href="/order/sell/${code}" class="btn btn-sm btn-danger me-2">SELL</a>

    </div></td>
        </tr>`;
        tableDataCoin.append(content);
    },
    renderData: function(listData) {
        this.clearAll();
        listData.forEach((data) => {
            num++;
            this.addRow(data.code, data.name, parseFloat(data.price), data.lastTypeUpdate, 'no', data.imgURL, data.oldPrice, num);
        })
    },
    clearAll: function() {
        tableDataCoin.empty();
    },
    removeRow: function(code) {
        let row = $(`#row-${code}`);
        row.remove();
    },
    setHaving: function(code, amount) {
        $(`#having-${code}`).html(amount);
    }
}

const setHavingCoin = async() => {
    let result = await API.getProfile();
    result.coin.forEach((coinBalance) => {
        tableCoinList.setHaving(coinBalance.code, coinBalance.amount.toFixed(2));
    })
}

const socket = io();
socket.on('priceList', (priceList) => {
    priceList.forEach((price) => {
        let priceElement = $(`#price-${price.code}`);
        let oldPriceElement = $(`#oldPrice-${price.code}`);
        if (isVisible($(`#priceOrder-${price.code}`))) {
            $(`#priceOrder-${price.code}`).html(price.price.toFixed(2) + ' $');
            if (price.lastTypeUpdate == 0) {
                $(`#priceOrder-${price.code}`).addClass('text-danger').removeClass('text-success');
            } else {
                $(`#priceOrder-${price.code}`).addClass('text-success').removeClass('text-danger');
            }
        }
        if (isVisible(priceElement)) {
            priceElement.html(`<span class="text-${price.lastTypeUpdate == 0 ? 'danger' : 'success'} fw-bolder text-hover-primary d-block fs-6">${price.price.toFixed(2)}$</span>`);
            oldPriceElement.html(`<span class="text-${price.lastTypeUpdate == 0 ? 'danger' : 'success'} fw-bolder text-hover-primary d-block fs-6">${price.oldPrice.toFixed(2)}$</span>`);
        }

    })
});
socket.on('addCoin', (coin) => {
    num++;
    tableCoinList.addRow(coin.code, coin.name, coin.price, coin.lastTypeUpdate, 'no', coin.imgURL, coin.price, num);
});

socket.on('removeCoin', (code) => {
    tableCoinList.removeRow(code);
});


showCoinList();