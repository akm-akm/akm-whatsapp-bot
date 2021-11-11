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
    "group": false,
    async handle(Infor) {

        if (!Infor.stanzaId) {
            Infor.replytext(mess.tagtext);
            return
        }
        try {
            await Infor.client.deleteMessage(Infor.from, {
                id: Infor.stanzaId,
                remoteJid: Infor.from,
                fromMe: true
            })
        } catch (error) {
            Infor.replytext(mess.error.error);

        }

    }
}