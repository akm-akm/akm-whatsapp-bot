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



const template = (Infor, client, xxx3) =>

    new Promise(async (resolve, reject) => {



        const xxx = { ...xxx3 };
        const from = Infor.from;
        const arg = Infor.arg;

        // your code here 

        // resolve() after success

        // reject(Infor) after failure



      
    })



module.exports.template = template;