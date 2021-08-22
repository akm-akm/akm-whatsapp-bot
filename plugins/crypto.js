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
    "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY ,
  },
  json: true,
  gzip: true,
};

var message;

const crypto = (infor4, client, xxx3) =>
  new Promise((resolve, reject) => {
    var c = 0;
    let infor5 = { ...infor4 };
    let xxx = { ...xxx3 };

    arg=infor5.arg;
    from=infor5.from;

    if (arg.length==1){
      infor5.arg = ["help", arg[0]]
      help(infor5, client, xxx, 1);
      reject()
    return}
    if (!coins.includes(arg[1].toUpperCase())) {
   
      client.sendMessage(from,  "🤖 ```Not in coinmarketcap.```", text, {
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
                " 💹" +
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
                "\n\n" +
                "```CoinMarketCap API```" +
                "\n";
            
              client.sendMessage(from,message, text, {
                quoted: xxx,
              });  
              resolve();
            }
          });
        })
        .catch(function (error) {
          console.log(error);
          client.sendMessage(from,"```Error```", text, {
            quoted: xxx,
          }); 
          reject();
        });
    }
  });
module.exports.crypto = crypto;
