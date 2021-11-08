const path = require("path");
const { help } = require(path.join(__dirname, "../utils/help"));

const solenolyrics = require("solenolyrics");

const {
    MessageType
} = require("@adiwajshing/baileys");

module.exports = {
    "name": "lyrics",
    "usage": "lyrics <song>",
    "desc": "Provides the lyrics of the given song.",
    "eg": [
        "lyrics Brown munde",
        "lyrics Baby"
    ],
    handle(Infor, client) {
        new Promise(async (resolve, reject) => {
            const arg = Infor.arg;
            const from = Infor.from;

            if (arg.length == 1) {
                Infor.arg = ["help", arg[0]]
                help(Infor, client, Infor.reply, 1);
                resolve()
                return
            }

            solenolyrics.requestLyricsFor(arg.splice(1).join(" ")).then(async (lyrics) => {
                client.sendMessage(
                    from,
                    lyrics,
                    MessageType.text, {
                    quoted: Infor.reply
                })
            })

        })
    }
}