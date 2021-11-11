const path = require("path");
const { help } = require(path.join(__dirname, "../utils/help"));

const solenolyrics = require("solenolyrics");
const mess = require(path.join(__dirname, "../data/messages.json"));

module.exports = {
    "name": "lyrics",
    "usage": "lyrics <song>",
    "desc": "Provides the lyrics of the given song.",
    "eg": [
        "lyrics Brown munde",
        "lyrics Baby"
    ],
    "group": false,
    handle(Infor) {
        const arg = Infor.arg;

        if (arg.length == 1) {
            Infor.arg = ["help", arg[0]]
            help(Infor, client, Infor.reply, 1);
            return
        }

        solenolyrics.requestLyricsFor(arg.splice(1).join(" ")).then(async (lyrics) => {
            Infor.replytext(lyrics)
        }).catch((e) => Infor.replytext(mess.error.error))

    }
}