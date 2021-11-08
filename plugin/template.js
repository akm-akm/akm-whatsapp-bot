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
const { help } = require(path.join(__dirname, "../utils/help"));


module.exports = {
    "name": 'template',
    "usage": "template <coinsymbol>",
    "desc": "template the template of template template template from template template its template.",
    "eg": [
        "template btc",
        "template xrp",
        "template eth"
    ],
    handle(Infor, client, Infor.reply) {

        new Promise(async (resolve, reject) => {



            const Infor.reply = { ...Infor.reply };
            const from = Infor.from;
            const arg = Infor.arg;

            // your code here 

            // resolve() after success

            // reject(Infor) after failure




        })


    }
}