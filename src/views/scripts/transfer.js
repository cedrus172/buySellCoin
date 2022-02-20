const reloadBalance = async() => {
    let profile = await API.getProfile();
    $('#yourBalance').html(`Your USD : ${profile.usd.toFixed(2)}`);
    $('#myUsd').html(`Your USD : ${profile.usd.toFixed(2)} $`);
    reloadTableData();
}

const reloadTableData = async() => {
    let table = $('#tableDataTransfer');
    let transfers = await API.getListTransfer();
    table.empty();
    let num = 0;
    transfers.data.forEach((transfer) => {
        let m = new Date(transfer.date);
        num++;
        let dateString = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate()
        let content = `<tr>
        <td>
        <div class="d-flex justify-content-start flex-column">
        <span class="text-dark fw-bolder text-hover-primary fs-6">${num}</span>
         </div>
        </td>
        <td>
        <div class="d-flex align-items-center">       
        <div class="d-flex justify-content-start flex-column">
            <span class="text-dark fw-bolder text-hover-primary fs-6">${transfer.userFrom}</span>
        </div></td>
        <td>
        <div class="d-flex align-items-center">       
        <div class="d-flex justify-content-start flex-column">
            <span class="text-dark fw-bolder text-hover-primary fs-6">${transfer.userTo}</span>
        </div>
        </div>
        </td>
        <td><span class="text-danger fw-bolder text-hover-primary d-block fs-6">${transfer.amount} $</span></td>$</span></td>
        <td><span class="text-primary fw-bolder text-hover-primary d-block fs-6">${dateString}</span></td>
       
        </tr>`;
        table.append(content);
    })
}

$('#transferBtn').click(async() => {
    let username = $('#username').val().toLowerCase();
    let amount = parseFloat($('#amount').val());
    let transfer = await API.transferUsd(username, amount);
    if (transfer.type == 1) {
        reloadBalance();
        sendAlert(transfer.message, 'Success', 'success');
    } else {
        sendAlert(transfer.message, 'Error', 'error');
    }
})
reloadTableData();