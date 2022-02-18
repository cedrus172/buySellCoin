const API = {
    register: function(username, password) {
        return $.ajax({
            url: full_url + "api/user/register",
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
            url: full_url + "api/user/login",
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
            url: full_url + "api/coin/list",
            method: "get",
            headers: { 'Content-Type': 'application/json' }

        });
    },

    getPriceList: function(code) {
        return $.ajax({
            url: full_url + "api/price/list/" + code,
            method: "get",
            headers: { 'Content-Type': 'application/json' }
        });
    },

    buyCoin: function(amount, code) {
        return $.ajax({
            url: full_url + "api/order/buy",
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                code: code,
                amount: amount
            })
        });
    },

    sellCoin: function(amount, code) {
        return $.ajax({
            url: full_url + "api/order/sell",
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                code: code,
                amount: amount
            })
        });
    },

    getProfile: function() {
        return $.ajax({
            url: full_url + "api/user/profile",
            method: "get",
            headers: { 'Content-Type': 'application/json' }
        });
    },

    getHistoriesByCode: function(type, code) {
        return $.ajax({
            url: `${full_url}api/order/list/${type}/${code}`,
            method: "get",
            headers: { 'Content-Type': 'application/json' }
        });
    },

    addCoin: function(name, code) {
        return $.ajax({
            url: full_url + "api/coin/new",
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                name: name,
                code: code
            })
        });
    },

    deleteCoin: function(code) {
        return $.ajax({
            url: full_url + "api/coin/delete/" + code,
            method: "get",
            headers: { 'Content-Type': 'application/json' }
        });
    },

    getPriceCoin: function(code) {
        return $.ajax({
            url: full_url + "api/coin/price/" + code,
            method: "get",
            headers: { 'Content-Type': 'application/json' }
        });
    }
}