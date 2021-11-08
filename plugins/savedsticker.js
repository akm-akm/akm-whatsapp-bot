const path = require("path");
const fs = require("fs");
const { MessageType } = require("@adiwajshing/baileys");
const { sticker } = MessageType;

const savedsticker = (Infor, client, xxx3) => new Promise((resolve, reject) => {
    const xxx = { ...xxx3 };
    const arg = Infor.arg
    const from = Infor.from;
    let random;
    if (arg[0] == "rashmika") {
        random = Math.floor(Math.random() * 304 + 1);
        ran = path.join(__dirname, "../assets/stickers/rashmika/rashmika (") + random + ").webp";

    }

    else if (arg[0] == "rs") {
        random = Math.floor(Math.random() * 500);
        ran = path.join(__dirname, "../assets/stickers/allsticker/s (") + random + ").webp";

    }
    client.sendMessage(from, fs.readFileSync(ran), sticker, {
        quoted: xxx,
    });
    resolve();
});
module.exports.savedsticker = savedsticker;