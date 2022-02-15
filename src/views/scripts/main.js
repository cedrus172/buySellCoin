const showCoinList = async() => {
    let result = await API.getCoinList();
    result.forEach(data => {
        data.price = data.price.$numberDecimal
    })
    tableCoinList.renderData(result);
}
const tableDataCoin = $('#tableCoinList');

const tableCoinList = {
    addRow: function(code, name, price, lastUpdate, actions) {
        let content = `<tr>
        <td>
             <div class="form-check form-check-sm form-check-custom form-check-solid">
             <input class="form-check-input widget-9-check" type="checkbox" value="1" />
            </div>
        </td>
        <td><span class="text-dark fw-bolder text-hover-primary fs-6">${name}</span></td>
        <td><span class="text-${lastUpdate == 0 ? 'danger' : 'success'} fw-bolder text-hover-primary d-block fs-6" id="price-${code}">${price}$</span></td>
        <td>${lastUpdate}</td>
        <td>${actions}</td>
        </tr>`;
        tableDataCoin.append(content);
    },
    renderData: function(listData) {
        this.clearAll();
        listData.forEach((data) => {
            this.addRow(data.code, data.name, parseFloat(data.price).toFixed(2), data.lastTypeUpdate, 'no');
        })
    },
    clearAll: function() {
        tableDataCoin.empty();
    }
}

const socket = io();
socket.on('priceList', (priceList) => {
    /*priceList.forEach((data) => {
        console.log(data);
    })*/
    tableCoinList.renderData(priceList);
});
showCoinList();