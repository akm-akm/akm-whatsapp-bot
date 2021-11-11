const axios = require("axios");
const path = require("path");

let msg = '';
const {
  MessageType
} = require("@adiwajshing/baileys");
const {
  text
} = MessageType;
const { help } = require(path.join(__dirname, "../utils/help"));

function stripTags(string) {
  return string.replace(/<(.|\n)*?>/g, "").trim();
}
const proxy = {
  proxy: {
    host: '103.35.134.30',
    port: 83
  }
}
function searchTransformer(isIndex) {
  let matcher = "";
  if (isIndex) {
    matcher = /underlying=(.*?)&/;
  } else {
    matcher = /symbol=(.*?)&/;
  }

  return function (data) {
    const matches = data.match(/<li>(.*?)<\/li>/g);
    return matches.map(function (value1) {
      let symbol = value1.match(matcher);
      value1 = stripTags(value1).replace(symbol[1], "");
      return {
        name: value1 || "",
        symbol: symbol[1] || "",
      };
    });
  };
}


module.exports = {
  "name": "market",
  "usage": "market <arguments>",
  "desc": "Fetches the information of given symbol from NSE. Arguments it can take are,\n📱 status - It will give the status of the market.\n📱 search <name> - It will search all the companies with this name.\n📱 details <key> - It will give all the details of the stock from NSE.\n📱 losers - It will give top 10 loosers of NSE.\n📱 gainers - It will give top 10 gainers of NSE.",
  "eg": [
    "market status",
    "market search tata",
    "market details tcs",
    "market losers",
    "market gainers"
  ],
  "group": false,
  handle(Infor) {
    new Promise((resolve, reject) => {
      const arg = Infor.arg
      const from = Infor.from;

      if (arg.length == 1) {
        Infor.arg = ["help", arg[0]]
        help(Infor, client, Infor.reply, 1);
        resolve()
        return
      }
      switch (arg[1]) {
        case "status":
          axios
            .get(
              "https://www1.nseindia.com//emerge/homepage/smeNormalMktStatus.json"
              , proxy
            )
            .then((response) => {
              if (response.error) {
                Infor.replytext(mess.error.error)
                resolve();

              } else {
                let msg =
                  "Market status : ```" + response.data.NormalMktStatus + "```";
                Infor.replytext(from, msg, text, {
                  quoted: Infor.reply,
                });
                resolve();

              }
            })
            .catch((err) => {
              console.log(err);
              reject(Infor);
            });
          break;
        case "gainer":
        case "gainers":
          axios
            .get(
              "https://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json"
              , proxy)
            .then((response) => {
              let msg = "*Gainers* 📈";

              if (response.error) {
                console.log("err");
                Infor.replytext(from, "```Error```", text, {
                  quoted: Infor.reply,
                });
                reject();
              } else {
                response.data.data.forEach((element) => {
                  msg +=
                    "\n\n\n📈 " +
                    "*" +
                    element.symbol +
                    "*\n```Open Price: " +
                    element.openPrice +
                    "```\n" +
                    "```High Price: " +
                    element.highPrice +
                    "```\n" +
                    "```Low Price : " +
                    element.lowPrice +
                    "```\n" +
                    "```turnoverInLakhs : " +
                    element.turnoverInLakhs +
                    "```\n" +
                    "```Prev Price: " +
                    element.previousPrice +
                    "```";
                });
                Infor.replytext(from, msg, text, {
                  quoted: Infor.reply,
                });
                resolve();
              }
            })
            .catch((err) => {
              console.log(err);
              reject(Infor);
            });

          break;
        case "stock":
        case "stocks":
          axios
            .get(
              "https://www1.nseindia.com/live_market/dynaContent/live_watch/stock_watch/nifty"
              , proxy)
            .then((response) => {
              let msg = "*Index Stocks NIFTY* 📈";
              if (response.error) {
                console.log("err");
              } else {
                response.data.data.forEach((element) => {
                  msg +=
                    "\n\n\n📈 " +
                    "*" +
                    element.symbol +
                    "*\n```Open Price: " +
                    element.open +
                    "```\n" +
                    "```High Price: " +
                    element.high +
                    "```\n" +
                    "```Low Price : " +
                    element.low +
                    "```\n" +
                    "```Prev Close: " +
                    element.previousClose +
                    "```\n" +
                    "```Traded vol: " +
                    element.trdVol +
                    "```\n" +
                    "```last tP   : " +
                    element.ltP +
                    "```";
                });
                Infor.replytext(from, msg, text, {
                  quoted: Infor.reply,
                });
                resolve();
              }
            })
            .catch((err) => {

              console.log(err);

              reject(Infor);

            });

          break;

        case "losers":
        case "loser":
          axios
            .get(
              "https://www1.nseindia.com/live_market/dynaContent/live_analysis/losers/niftyLosers1.json"
              , proxy)
            .then((response) => {
              let msg = "*Losers* 📈";

              if (response.error) {
                console.log("err");
              } else {
                response.data.data.forEach((element) => {
                  msg +=
                    "\n\n📈 " +
                    "*" +
                    element.symbol +
                    "*\n```Open Price: " +
                    element.openPrice +
                    "```\n" +
                    "```High Price: " +
                    element.highPrice +
                    "```\n" +
                    "```Low Price : " +
                    element.lowPrice +
                    "```\n" +
                    "```Prev Price: " +
                    element.previousPrice +
                    "```\n"; +
                      "```turnoverInLakhs : " + element.turnoverInLakhs + "```";
                });
                Infor.replytext(from, msg, text, {
                  quoted: Infor.reply,
                });
                resolve();
              }
            })
            .catch((err) => {
              console.log(err);
              reject(Infor);
            });

          break;

        case "search":

          if (arg.length < 3) {
            Infor.replytext(from, "```Enter stocks name to search.```", text, {
              quoted: Infor.reply,
            });
            resolve();
            return
          }
          if (arg.length > 3) {
            Infor.replytext(from, "```Searching only the first word.```", text, {
              quoted: Infor.reply,
            });
          }
          axios
            .get(
              "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxCompanySearch.jsp?search=" +
              arg[2].toUpperCase(), {
              headers: {
                "X-Requested-With": "XMLHttpRequest",
                Referer: "https://www.nseindia.com/ChartApp/install/charts/mainpage.jsp",
                Host: "www.nseindia.com",
              },
              transformResponse: searchTransformer(false),
            }
              , proxy)
            .then((response) => {
              if (response.error) {
                console.log("err");
              } else {
                msg =
                  "*Search Result* 🔎\n"
                response.data.forEach((element) => {
                  msg = msg +

                    "\n\n📈 " +
                    "*" +
                    element.symbol +
                    "*\n" +
                    "NAME      : ```" +
                    element.name +
                    "```\n" +
                    "SYMBOL  : ```" +
                    element.symbol +
                    "```";
                });
                Infor.replytext(from, msg, text, {
                  quoted: Infor.reply,
                });
                resolve();
              }
            })
            .catch((err) => {
              console.log(err);
              reject(Infor);
            });
          break;

        case "details":
        case "detail":
          if (arg.length < 3) {
            Infor.replytext(from, "```Enter stock symbol to get details.```", text, {
              quoted: Infor.reply,
            });
            resolve();
            return
          }
          if (arg.length > 3) {
            Infor.replytext(from, "```Searching only the first symbol.```", text, {
              quoted: Infor.reply,
            });
          }
          axios
            .get(
              "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxGetQuoteJSON.jsp?series=EQ&symbol=" +
              arg[2].toUpperCase(), {
              headers: {
                Referer: "https://www1.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxGetQuoteJSON.jsp?series=EQ&symbol=" +
                  arg[2].toUpperCase(),
                "X-Requested-With": "XMLHttpRequest",
              },
            }
              , proxy)
            .then((response) => {
              if (response.error) {
                console.log("err");
              } else if (response.data.data.length == 0) {
                msg = "```Not Found```";

              } else {
                element = response.data.data[0];

                msg =
                  "📈 " +
                  element.companyName +
                  "\n" +
                  "\n```pricebandupr  : " +
                  element.pricebandupper +
                  "```\n" +
                  "```applcblMargin : " +
                  element.applicableMargin +
                  "```\n" +
                  "```dayHigh       : " +
                  element.dayHigh +
                  "```\n" +
                  "```dayLow        : " +
                  element.dayLow +
                  "```\n" +
                  "```basePrice     : " +
                  element.basePrice +
                  "```\n" +
                  "```securityVar   : " +
                  element.securityVar +
                  "```\n" +
                  "```pricebandlower: " +
                  element.pricebandlower +
                  "```\n" +
                  "```lastPrice     : " +
                  element.lastPrice +
                  "```\n" +
                  "```varMargin     : " +
                  element.varMargin +
                  "```\n" +
                  "```totalTradedVol: " +
                  element.totalTradedVolume +
                  "```\n" +
                  "```open          : " +
                  element.open +
                  "```\n" +
                  "```closePrice    : " +
                  element.closePrice +
                  "```\n" +
                  "```faceValue     : " +
                  element.faceValue +
                  "```\n" +
                  "```sellPrice1    : " +
                  element.sellPrice1 +
                  "```\n" +
                  "```sellPrice2    : " +
                  element.sellPrice2 +
                  "```\n" +
                  "```buyPrice1     : " +
                  element.buyPrice1 +
                  "```\n" +
                  "```buyPrice2     : " +
                  element.buyPrice2 +
                  "```\n" +
                  "```high52        : " +
                  element.high52 +
                  "```\n" +
                  "```low52         : " +
                  element.low52 +
                  "```\n" +
                  "```Update Time   : " +
                  response.data.lastUpdateTime.split(" ")[1] +
                  "```";
                Infor.replytext(from, msg, text, {
                  quoted: Infor.reply,
                });
                resolve();
              }
            })
            .catch((err) => {
              console.log(err);
              reject(Infor);
            });
          break;

        default:
          Infor.arg = ["help", arg[0]]
          help(Infor, client, Infor.reply);
          resolve();
      }


    })
  }
}