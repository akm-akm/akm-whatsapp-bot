const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;
const path = require("path");
const fs = require('fs');

const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const deleteit = (infor4, client, xxx3) =>
    new Promise(async (resolve, reject) => {
        const infor5 = { ...infor4 };
        const xxx = { ...xxx3 };
        const from = infor5.from;

        const type = Object.keys(xxx.message)[0];
        if (type !== "extendedTextMessage") {
            client.sendMessage(from, mess.error.error, text, { quoted: xxx });
            resolve()
            return
        }
        try {
            await client.deleteMessage(from, {
                id: infor5.stanzaId,
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