const path = require("path");


module.exports = {
    "name": "rs",
    "usage": "rs",
    "desc": "The bot will send a random sticker.",
    "eg": [
        "rs"
    ],
    "group": false,
    handle(Infor) {
        const random = Math.floor(Math.random() * 500);
        const ran = path.join(__dirname, "../assets/stickers/allsticker/s (") + random + ").webp";
        Infor.replysticker(ran)
    }
}