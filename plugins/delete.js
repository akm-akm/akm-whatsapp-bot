const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;

const deleteit = (infor4, client, xxx3) =>
    new Promise(async (resolve, reject) => {
        const infor5 = { ...infor4 };
        const xxx = { ...xxx3 };
        const from = infor5.from;

        const type = Object.keys(xxx.message)[0];
        if (type !== "extendedTextMessage") {
            client.sendMessage(from, "🤖  ```Reply to my message that is to be deleted.```", text, { quoted: xxx });
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
            client.sendMessage(from, "🤖  ```Reply to my message that is to be deleted.```", text, { quoted: xxx });
            resolve()
         

        }


    })
module.exports.deleteit = deleteit;