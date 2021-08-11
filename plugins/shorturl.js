const axios = require("axios");
const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;
const path = require("path");

const { help } = require(path.join(__dirname, "./help"));

const shorturl = (infor, client, xxx) =>
    new Promise((resolve, reject) => {
        arg = infor.arg
        from = infor.from;
        if (arg.length == 1) {
            infor.arg = ["help", arg[0]]
            help(infor, client, xxx, 1);
            resolve()
            return
        }

        axios({
            method: "POST",
            url: "https://lenk.cf/p/" + encodeURIComponent(arg[1])
        })
            .then((response) => {
                if (response.data == 'Invalid URL') {
                    client.sendMessage(from, "🤖 ```Wrong URL```", text, {
                        quoted: xxx
                    });
                    resolve()
                    return
                }
                msg = "🤖 ```shortened url is:```" + "\n" +
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
                client.sendMessage(from, "🤖  ```Server error.```", text, {
                    quoted: xxx,
                    
                });
                reject();
            })
    });

  
module.exports.shorturl = shorturl;
