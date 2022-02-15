const sendAlert = (message, title, type) => {
    let typeButton = type == "error" ? "danger" : type;
    Swal.fire({
        text: message,
        icon: type,
        buttonsStyling: false,
        confirmButtonText: "Confirm",
        customClass: {
            confirmButton: "btn btn-" + typeButton
        }
    });
}

const isChecked = (param) => {
    return param.is(':checked');
}

const isVisible = (param) => {
    return param.is(':visible');
}


const setChecked = (param, enable) => {
    if (enable)
        param.attr('checked', true);
    else
        param.removeAttr('checked');
}

const setDisable = (param, enable) => {
    if (enable)
        param.attr('disabled', true);
    else
        param.removeAttr('disabled');
}