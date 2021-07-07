const axios = require("axios");
const fs = require("fs");
const path = require("path");
const api = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/api.json"))
);
const coins = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/coins.json"))
);
const requestOptions = {
  method: "GET",
  url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
  qs: {
    start: "1",
    limit: "5000",
    convert: "USD",
  },
  headers: {
    "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY || api.API_KEY,
  },
  json: true,
  gzip: true,
};

var message;

const crypto = (arg) =>
  new Promise((resolve, reject) => {
    var c = 0;

    if (!coins.includes(arg[1].toUpperCase())) {
       message = "Not listed in coinmarketcap";
       resolve(message)
    } else {
      axios(requestOptions)
        .then(function (response) {
          response.data.data.forEach((element) => {
            if (element.symbol == arg[1].toUpperCase()) {
              c = element.quote.USD;
               message =
               "*" + arg[1].toUpperCase() +
                "* " +
                "/" +
                " " +
                "*USDT*" +
                " 💹" +
                "\n\n" +
                "```price      : ```" +
                c.price.slice(0, 2+c.price.indexOf('.'))
                "\n" +
                "```1h change  : ```" +c.percent_change_1h.slice(0,2+c.percent_change_1h.indexOf('.')) + "```%```" + "\n" +
                "```24h change : ```" +
                c.percent_change_24h.slice(0,2+c.percent_change_24h.indexOf('.')) +
                "```%```" +
                "\n" +
                "```market cap : ```" +
                c.market_cap.slice(0,2+c.market_cap.indexOf('.')) 
                +
                "\n\n" +
                "```CoinMarketCap API```" +
                "\n";
               resolve(message)
            }
          });
        })
        .catch(function (error) {
          console.log(error);
           message = "Error";
           resolve(message)
        });
      
    }
  });
module.exports.crypto = crypto;
