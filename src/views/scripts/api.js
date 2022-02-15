const API = {
    register: function(username, password) {
        return $.ajax({
            url: "/api/user/register",
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                username: username,
                password: password
            })
        });
    },
    login: function(username, password) {
        return $.ajax({
            url: "/api/user/login",
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                username: username,
                password: password
            })
        });
    },

    getCoinList: function() {
        return $.ajax({
            url: "/api/coin/list",
            method: "get",
            headers: { 'Content-Type': 'application/json' }

        });
    }
}