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
    "group": false,
    handle(Infor) {
        const random = Math.floor(Math.random() * 304 + 1);
        const ran = path.join(__dirname, "../assets/stickers/rashmika/rashmika (") + random + ").webp";
        Infor.replysticker(ran)
    }
}