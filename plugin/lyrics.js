const solenolyrics = require("solenolyrics");

module.exports = {
    "name": "lyrics",
    "usage": "lyrics <song>",
    "desc": "Provides the lyrics of the given song.",
    "eg": [
        "lyrics Brown munde",
        "lyrics Baby"
    ],
    "group": false,
    "owner": false,
    handle(Infor) {
        const arg = Infor.arg;

        if (arg.length == 1) {
            Infor.wrongCommand()

            return
        }

        solenolyrics.requestLyricsFor(arg.splice(1).join(" ")).then(async (lyrics) => {
            Infor.replytext(lyrics)
        }).catch((e) => Infor.replytext(Infor.mess.error.error))

    }
}