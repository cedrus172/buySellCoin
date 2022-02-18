$('#addBtn').click(async() => {
    const name = $('#coinName').val();
    const code = $('#coinCode').val();
    const price = $('#coinPrice').val();
    let result = await API.addCoin(name, code)
    if (result.type == 1) {
        getCoinListDelete();
        sendAlert(result.message, 'Success', "success");
    } else {
        sendAlert(result.message, 'Error', 'error');
    }
});

$('#deleteBtn').click(async() => {
    const code = $('#coinListDelete').val();
    let result = await API.deleteCoin(code)
    if (result.type == 1) {
        getCoinListDelete();
        sendAlert(result.message, 'Success', "success");
    } else {
        sendAlert(result.message, 'Error', 'error');
    }
});

$('#coinCode').change(async() => {
    let code = $('#coinCode').val().toUpperCase();
    $('#coinCode').val(code);
    let result = await API.getPriceCoin(code)
    if (result.type == 1) {
        $('#coinPrice').val(result.price);
        $('#title-nameCoin').html(code);
        $('#title-pictureCoin').attr('src', result.imgURL);
        $('#title-pictureCoin').show();
    } else {
        sendAlert(result.message, 'Error', 'error');
    }
})

const getCoinListDelete = async() => {
    let select = $('#coinListDelete');
    let listCoin = await API.getCoinList();
    select.empty();
    listCoin.forEach((coin) => {
        select.append(`<option data-picture="${coin.imgURL}" value="${coin.code}">${coin.name}</option>`);

    })

    // Format options
    const format = (item) => {
        if (!item.id) {
            return item.text;
        }

        var url = item.element.getAttribute('data-picture');
        var img = $("<img>", {
            class: "rounded-circle me-2",
            width: 26,
            src: url
        });
        var span = $("<span>", {
            text: " " + item.text
        });
        span.prepend(img);
        return span;
    }

    // Init Select2 --- more info: https://select2.org/
    $('#coinListDelete').select2({
        templateResult: function(item) {
            return format(item);
        }
    });
}
getCoinListDelete();