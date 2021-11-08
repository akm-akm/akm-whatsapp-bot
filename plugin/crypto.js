const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { help } = require(path.join(__dirname, "../utils/help"));
const {
  MessageType
} = require("@adiwajshing/baileys");
const {
  text
} = MessageType
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

let message;


module.exports = {
  "name": 'crypto',
  "usage": "crypto <coinsymbol>",
  "desc": "Fetches the price of given crypto currency from coinmarketcap using its API.",
  "eg": [
    "crypto btc",
    "crypto xrp",
    "crypto eth"
  ],
  handle(Infor, client) {
    new Promise((resolve, reject) => {
      let c = 0;
      const arg = Infor.arg;
      const from = Infor.from;

      if (arg.length == 1) {
        Infor.arg = ["help", arg[0]]
        help(Infor, client, Infor.reply, 1);
        reject()
        return
      }
      console.log(process.env.COINMARKETCAP_API_KEY);
      if (process.env.COINMARKETCAP_API_KEY === null) {
        client.sendMessage(from, "🤖 ```COINMARKETCAP_API_KEY environment variable is not set. Contact the bot owner.```"
          , text, {
          quoted: Infor.reply
        })
        resolve()
        return;
      }
      if (!coins.includes(arg[1].toUpperCase())) {

        client.sendMessage(from, "🤖 ```Not in coinmarketcap.```", text, {
          quoted: Infor.reply,
        });
        resolve();
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

                client.sendMessage(from, message, text, {
                  quoted: Infor.reply,
                });
                resolve();
              }
            });
          })
          .catch(function (error) {
            console.log(error);

            reject(Infor)
          });
      }
    })
  }
}