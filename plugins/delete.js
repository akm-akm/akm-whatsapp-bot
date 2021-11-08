const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;
const path = require("path");
const fs = require('fs');

const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);
const deleteit = (Infor, client, xxx3) =>
    new Promise(async (resolve, reject) => {
        const xxx = { ...xxx3 };
        const from = Infor.from;

        const type = Object.keys(xxx.message)[0];
        if (type !== "extendedTextMessage") {
            client.sendMessage(from, mess.error.error, text, { quoted: xxx });
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
            client.sendMessage(from, mess.error.error, text, { quoted: xxx });
            resolve()


        }


    })
module.exports.deleteit = deleteit;