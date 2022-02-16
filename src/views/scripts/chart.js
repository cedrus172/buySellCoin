async function renderChartByCode(code) {
    let result = await API.getPriceList(code);
    currentData = result;
    renderChart(result);
}

let currentData = [];

const renderChart = (data) => {

    // split the data set into ohlc and volume
    var ohlc = [],
        dataLength = data.length,
        // set the allowed units for data grouping
        groupingUnits = [
            [
                "week", // unit name
                [1], // allowed multiples
            ],
            ["month", [1, 2, 3, 4, 6]],
        ],
        i = 0;
    for (i; i < dataLength; i += 1) {
        ohlc.push([
            data[i].date, // the date
            parseFloat(data[i].open), // open
            parseFloat(data[i].high), // high
            parseFloat(data[i].low), // low
            parseFloat(data[i].close), // close
        ]);
    }
    console.log(ohlc);
    // create the chart
    stockChart = new Highcharts.stockChart("containerChart", {
        rangeSelector: {
            selected: 1,
        },

        chart: {
            events: {
                load() {
                    // set up the updating of the chart each second
                    // var series = this.series[0];
                    // setInterval(function() {
                    //     series.setData(currentData);
                    // }, 1000);
                },
            },
        },

        title: {
            text: "Chart drawn by Cedrus",
        },



        tooltip: {
            split: true,
        },

        series: [{
            type: "candlestick",
            name: "CEDRUS",
            id: "aapl",
            zIndex: 1,
            data: ohlc,
        }],
    });
}