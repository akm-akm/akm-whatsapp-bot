const path = require("path");
const fs = require("fs");
const { help } = require(path.join(__dirname, "./help"));

const solenolyrics = require("solenolyrics");

const {
    MessageType
} = require("@adiwajshing/baileys");
const lyrics = (infor4, client, xxx3) =>
    new Promise(async (resolve, reject) => {
        const infor5 = { ...infor4 };
        const xxx = { ...xxx3 };
        const arg = infor5.arg;
        const from = infor5.from;

        if (arg.length == 1) {
            infor5.arg = ["help", arg[0]]
            help(infor5, client, xxx, 1);
            resolve()
            return
        }

        solenolyrics.requestLyricsFor(arg.splice(1).join(" ")).then(async (lyrics) => {
            client.sendMessage(
                from,
               "```"+ lyrics+"```",
                MessageType.text, {
                quoted: xxx
            })
        })

    });
module.exports.lyrics = lyrics;
