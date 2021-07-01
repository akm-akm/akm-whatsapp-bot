const axios = require("axios");
const fs = require("fs");
const path = require("path");

var url = 'https://pin.it/6Ei5UsE'
console.clear()
var request = require('request')

var a


request({uri: url,followRedirect: false,},(err, httpResponse) =>{
    if (err)  return console.error(err)
    console.log(httpResponse.headers.location || uri)
    a= httpResponse.headers.location || uri

    
  }
)


console.log(a)
