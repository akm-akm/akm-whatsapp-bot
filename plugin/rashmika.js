const path = require("path");
const fs = require("fs");
const { MessageType } = require("@adiwajshing/baileys");
const { sticker } = MessageType;

module.exports = {
    "name": "rashmika",
    "usage": "rashmika",
    "desc": "The bot will send a Rashmika sticker ♥️.",
    "eg": [
        "rashmika"
    ],
    handle(Infor, client) {
        new Promise((resolve, reject) => {
            const from = Infor.from;
            const random = Math.floor(Math.random() * 304 + 1);
            const ran = path.join(__dirname, "../assets/stickers/rashmika/rashmika (") + random + ").webp";

            client.sendMessage(from, fs.readFileSync(ran), sticker, {
                quoted: Infor.reply,
            });
            resolve();
        })
    }
}