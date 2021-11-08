const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { help } = require(path.join(__dirname, "./help"));
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

const crypto = (Infor, client, xxx3) =>
  new Promise((resolve, reject) => {
    let c = 0;
    const xxx = { ...xxx3 };
    const arg = Infor.arg;
    const from = Infor.from;

    if (arg.length == 1) {
      Infor.arg = ["help", arg[0]]
      help(Infor, client, xxx, 1);
      reject()
      return
    }
    if (process.env.COINMARKETCAP_API_KEY === undefined) {
      client.sendMessage(from, "🤖 ```COINMARKETCAP_API_KEY environment variable is not set. Contact the bot owner.```"
        , text, {
        quoted: xxx
      })
      resolve()
      return;
    }
    if (!coins.includes(arg[1].toUpperCase())) {

      client.sendMessage(from, "🤖 ```Not in coinmarketcap.```", text, {
        quoted: xxx,
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
                quoted: xxx,
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
  });
module.exports.crypto = crypto;
