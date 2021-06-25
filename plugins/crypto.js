const axios = require("axios");
const fs = require("fs");
const path = require("path");
const api = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/api.json"))
);
const coins = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/coins.json"))
  );
var c=0
const requestOptions = {
  method: "GET",
  url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
  qs: {
    start: "1",
    limit: "5000",
    convert: "INR",
  },
  headers: {
    "X-CMC_PRO_API_KEY": api.API_KEY,
  },
  json: true,
  gzip: true,
};









axios(requestOptions)
  .then(function (response) {
    response.data.data.forEach((element) => {
      if (element.symbol == "XRP") 
      c = element.quote.USD;
    });
  })
  .catch(function (error) {
    console.log(error);
  });
