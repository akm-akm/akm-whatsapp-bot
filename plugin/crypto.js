const axios = require("axios");
const fs = require("fs");
const path = require("path");
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
  name: "crypto",
  usage: "crypto <coinsymbol>",
  desc: "Fetches the price of given crypto currency from coinmarketcap using its API.",
  eg: ["crypto btc", "crypto xrp", "crypto eth"],
  group: false,
  owner: false,
  handle(Xxxbot) {
    let c = 0;
    const arg = Xxxbot.arg;
    let message;

    if (arg.length == 1) {
      Xxxbot.wrongCommand();
      return;
    }
    if (!process.env.COINMARKETCAP_API_KEY) {
      Xxxbot.noapi();
      return;
    }
    if (!coins.includes(arg[1].toUpperCase())) {
      Xxxbot.replytext("🤖 ```Not in coinmarketcap.```");
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

              Xxxbot.replytext(message);
            }
          });
        })
        .catch((error) => {
          Xxxbot.errorlog(error);
        });
    }
  },
};
