const axios = require("axios");
const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;
const path = require("path");
const fs = require('fs');
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const { help } = require(path.join(__dirname, "./help"));

const shorturl = (infor4, client, xxx3) =>
    new Promise((resolve, reject) => {
        const infor5 = { ...infor4 };
        const xxx = { ...xxx3 };

        const arg = infor5.arg
        const from = infor5.from;
        if (arg.length == 1) {
            infor5.arg = ["help", arg[0]]
            help(infor5, client, xxx, 1);
            resolve()
            return
        }

        axios({
            method: "POST",
            url: "https://lenk.cf/p/" + encodeURIComponent(arg[1])
        })
            .then((response) => {
                if (response.data == 'Invalid URL') {
                    client.sendMessage(from, mess.error.invalid , text, {
                        quoted: xxx
                    });
                    resolve()
                    return
                }
                const msg = "🤖 ```shortened url is:```" + "\n" +
                    "```https://lenk.cf/```" +
                    "```" +
                    response.data +
                    "```" +
                    "\n\n" +
                    "```API by lenk.cf```";
                client.sendMessage(from, msg, text, {
                    quoted: xxx,
                    detectLinks: false

                })
                resolve();

            })
            .catch(() => {
                client.sendMessage(from, mess.error.error, text, {
                    quoted: xxx,

                });
                reject(infor5)
            })
    });


module.exports.shorturl = shorturl;
