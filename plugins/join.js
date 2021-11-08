const path = require("path");
const fs = require("fs");
const { help } = require(path.join(__dirname, "./help"));
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);
const {
    MessageType
} = require("@adiwajshing/baileys");
const joingroup = (Infor, client, xxx3) =>
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
            reject(Infor)

        }

    });
module.exports.joingroup = joingroup;
