const path = require("path");
const fs = require("fs");
const { MessageType } = require("@adiwajshing/baileys");
const { sticker } = MessageType;


module.exports = {
    "name": "rs",
    "usage": "rs",
    "desc": "The bot will send a random sticker.",
    "eg": [
        "rs"
    ],
    handle (Infor, client) { new Promise((resolve, reject) => {
   
    const from = Infor.from;
    const random = Math.floor(Math.random() * 500);
    const ran = path.join(__dirname, "../assets/stickers/allsticker/s (") + random + ").webp";

    client.sendMessage(from, fs.readFileSync(ran), sticker, {
        quoted: Infor.reply,
    });
    resolve();
    })
}}