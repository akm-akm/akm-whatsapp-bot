const path = require("path");
const { help } = require(path.join(__dirname, "./help"));

const solenolyrics = require("solenolyrics");

const {
    MessageType
} = require("@adiwajshing/baileys");
const lyrics = (Infor, client, xxx3) =>
    new Promise(async (resolve, reject) => {
        const xxx = { ...xxx3 };
        const arg = Infor.arg;
        const from = Infor.from;

        if (arg.length == 1) {
            Infor.arg = ["help", arg[0]]
            help(Infor, client, xxx, 1);
            resolve()
            return
        }

        solenolyrics.requestLyricsFor(arg.splice(1).join(" ")).then(async (lyrics) => {
            client.sendMessage(
                from,
                lyrics,
                MessageType.text, {
                quoted: xxx
            })
        })

    });
module.exports.lyrics = lyrics;
