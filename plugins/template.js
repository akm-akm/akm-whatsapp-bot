const fs = require("fs");
const path = require('path');
const {
    MessageType
} = require("@adiwajshing/baileys");
const {
    text,
} = MessageType;
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);
const { help } = require(path.join(__dirname, "./help"));



const template = (infor4, client, xxx3) =>

    new Promise(async (resolve, reject) => {



        const infor5 = { ...infor4 };
        const xxx = { ...xxx3 };
        const from = infor5.from;
        const arg = infor5.arg;

        // your code here 

        // resolve() after success

        // reject(infor5) after failure



      
    })



module.exports.template = template;