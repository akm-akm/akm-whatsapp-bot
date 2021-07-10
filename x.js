const fs = require("fs");
const path = require("path");
const sql = require(path.join(__dirname, "./snippets/ps"));



sql.query('\d;').then((result) => {
   console.log(result)
  }).catch((err) => {
    console.log(err)
  });