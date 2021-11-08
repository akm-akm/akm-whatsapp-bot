const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;
const path = require("path");
const fs = require('fs');

const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);

module.exports = {
    "name": "delete",
    "usage": "delete",
    "desc": "The bot will delete the tagged message.",
    "eg": [
        "delete"
    ],
    handle(Infor, client) {
        new Promise(async (resolve, reject) => {
            const from = Infor.from;

            const type = Object.keys(Infor.reply.message)[0];
            if (type !== "extendedTextMessage") {
                client.sendMessage(from, mess.error.error, text, { quoted: Infor.reply });
                resolve()
                return
            }
            try {
                await client.deleteMessage(from, {
                    id: Infor.stanzaId,
                    remoteJid: from,
                    fromMe: true
                })
                resolve()
            } catch (error) {
                client.sendMessage(from, mess.error.error, text, { quoted: Infor.reply });
                resolve()


            }


        })
    }
}