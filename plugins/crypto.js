const axios = require("axios");
const fs = require("fs");
const path = require("path");
const api = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/api.json"))
);
const coins = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/coins.json"))
);
var c = 0;
const requestOptions = {
    method: "GET",
    url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    qs: {
        start: "1",
        limit: "5000",
        convert: "USD",
    },
    headers: {
        "X-CMC_PRO_API_KEY": api.API_KEY,
    },
    json: true,
    gzip: true,
};

function crypto(arg) {
    if (arg.length < 1)
        if (!coins.includes(arg[1].toUpperCase())) {
            return "```Not a coin```";
        }

    axios(requestOptions)
        .then(function (response) {
            response.data.data.forEach((element) => {
                if (element.symbol == arg[1].toUpperCase()) {
                    c = element.quote.USD;
                    return (message =
                        "\n*" +
                        arg[1].toUpperCase() +
                        "* " +
                        "/" +
                        " " +
                        "*USDT*" +
                        " 💹" +
                        "\n" +
                        "```CoinMarketCap```" +
                        "\n\n" +
                        "```name ```" +
                        element.name +
                        "\n" +
                        "```price ```" +
                        c.price +
                        "\n" +
                        "```change in 1h ```" +
                        c.percent_change_1h +
                        "```%```" +
                        "\n" +
                        "```change in 24h ```" +
                        c.percent_change_24h +
                        "```%```" +
                        "\n" +
                        "```market cap ```" +
                        c.market_cap +
                        "\n" +
                        "```last updated ```" +
                        c.last_updated.split("T")[1].split(".")[0] +
                        "\n");

                  
                }
            });
          
        })
        .catch(function (error) {
            console.log(error);
        });
}


module.exports.crypto = crypto;