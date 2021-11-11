const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { help } = require(path.join(__dirname, "../utils/help"));
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
    "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
  },
  json: true,
  gzip: true,
};



module.exports = {
  "name": 'crypto',
  "usage": "crypto <coinsymbol>",
  "desc": "Fetches the price of given crypto currency from coinmarketcap using its API.",
  "eg": [
    "crypto btc",
    "crypto xrp",
    "crypto eth"
  ],
  "group": false,
  handle(Infor) {
    let c = 0;
    const arg = Infor.arg;
    let message;

    if (arg.length == 1) {
      Infor.arg = ["help", arg[0]]
      help(Infor, client, Infor.reply, 1);
      return
    }
    if (!process.env.COINMARKETCAP_API_KEY) {
      Infor.replytext("🤖 ```COINMARKETCAP_API_KEY environment variable is not set. Contact the bot owner.```");
      return;
    }
    if (!coins.includes(arg[1].toUpperCase())) {

      Infor.replytext("🤖 ```Not in coinmarketcap.```")
    } else {
      axios(requestOptions)
        .then(function (response) {
          response.data.data.forEach((element) => {
            if (element.symbol == arg[1].toUpperCase()) {
              c = element.quote.USD;
              message =
                "*" +
                arg[1].toUpperCase() +
                "* " +
                "/" +
                " " +
                "*USDT*" +
                " 💹 *Coinmarketcap*" +
                "\n\n" +
                "```Buy price  : ```" +
                c.price.toFixed(3) +
                "\n" +
                "```1h change  : ```" +
                c.percent_change_1h.toFixed(2) +
                " ```%```" +
                "\n" +
                "```24h change : ```" +
                c.percent_change_24h.toFixed(2) +
                " ```%```" +
                "\n" +
                "```market cap : ```" +
                c.market_cap.toFixed(2) +
                "\n";

              Infor.replytext(message);
            }
          });
        })
        .catch((error) => {
          Infor.errorlog(error)
        });
    }
  }
}