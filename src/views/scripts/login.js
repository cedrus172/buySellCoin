$('#submitBtn').click(async function() {
    const username = $('#username').val().toLowerCase();
    const password = $('#password').val();
    const result = await API.login(username, password);
    if (result.type == 1) {
        sendAlert(result.message, "Success", "success");
        window.location.href = '/';
    } else
        sendAlert(result.message, "Error", "error");
})