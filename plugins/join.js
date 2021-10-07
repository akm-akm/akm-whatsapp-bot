const path = require("path");
const fs = require("fs");
const { help } = require(path.join(__dirname, "./help"));
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const {
    MessageType
} = require("@adiwajshing/baileys");
const joingroup = (infor4, client, xxx3) =>
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
        if (!arg[1].includes("https://chat.whatsapp.com/")) {
            client.sendMessage(from, mess.error.invalid, MessageType.text, {
                quoted: xxx,
            });
            resolve()
            return
        }
        try {
            await client.acceptInvite(arg[1].split(".com/")[1]);
            client.sendMessage(from, mess.success, MessageType.text, {
                quoted: xxx,
            });
            resolve();
        } catch (error) {
            reject(infor5)

        }

    });
module.exports.joingroup = joingroup;
