$('#buyBtn').click(async() => {
    let amount = $('#amount').val();
    let result = await API.buyCoin(amount, COIN);
    if (result.type == 1) {
        setHavingCoin();
        $('#yourBalance').html(`Your USD : ${result.usdAfter.toFixed(2)}`);
        getHistories('BUY');
        sendAlert(result.message, 'Success', "success");
    } else {
        sendAlert(result.message, 'Error', "error");
    }
});

$('#sellBtn').click(async() => {
    let amount = $('#amount').val();
    let result = await API.sellCoin(amount, COIN);
    if (result.type == 1) {
        setHavingCoin();
        $('#yourBalance').html(`Your USD : ${result.usdAfter.toFixed(2)}`);
        $('#coinBalance').html(`Your ${COIN} : ${result.coinAfter.toFixed(2)}`);
        getHistories('SELL');
        sendAlert(result.message, 'Success', "success");
    } else {
        sendAlert(result.message, 'Error', "error");
    }
});

const reloadBalance = async() => {
    let profile = await API.getProfile();
    $('#yourBalance').html(`Your USD : ${profile.usd.toFixed(2)}`);
    $('#myUsd').html(`Your USD : ${result.usd} $`);
}

let tableHistories = $('#tableHistories');
const tableHistoriesHandle = {
    addRow: function(code, amount, total, time, number) {
        let content = `<tr>
        <td>
        <div class="d-flex justify-content-start flex-column">
        <span class="text-dark fw-bolder text-hover-primary fs-6">${number}</span>
         </div>
        </td>
        <td>
        <div class="d-flex align-items-center">       
        <div class="d-flex justify-content-start flex-column">
            <span class="text-dark fw-bolder text-hover-primary fs-6">${code}</span>
        </div>
        </div>
        </td>
        <td><span class="text-danger fw-bolder text-hover-primary d-block fs-6">${amount.toFixed(2)}</span></td>$</span></td>
        <td><span class="text-success fw-bolder text-hover-primary d-block fs-6">${total.toFixed(2)}$</span></td>
        <td><span class="text-primary fw-bolder text-hover-primary d-block fs-6">${time}</span></td>
       
        </tr>`;
        tableHistories.append(content);
    },
    clearAll: function() {
        tableHistories.empty();
    }
}

const getHistories = async(type) => {
    let result = await API.getHistoriesByCode(type, COIN);
    let num = 0;
    tableHistoriesHandle.clearAll();
    result.forEach((row) => {
        num++;
        let m = new Date(row.date);
        let dateString = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();

        tableHistoriesHandle.addRow(row.code, parseFloat(row.amount), parseFloat(row.total), dateString, num);
    })
}