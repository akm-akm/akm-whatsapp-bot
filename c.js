const { settingread }= require('./snippets/settingcheck');
const fs = require("fs");
const path = require("path");
//info= settingread("xnxx jytf djjy yjdj gfj","976775656@g.us","fghgy")
var c=0
const crypto = JSON.parse(
    fs.readFileSync(path.join(__dirname, "./data/crypto.json"))
  );

 crypto.forEach(element => {
  cd.push(element.symbol)
});

console.log(c)

