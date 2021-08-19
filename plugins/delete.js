const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;

const deleteit = (infor4, client, xxx3) =>
    new Promise(async (resolve, reject) => {
        let infor5 = { ...infor4 };
        let xxx = { ...xxx3 };

        const type = Object.keys(xxx.message)[0];
       if(type !== "extendedTextMessage") {
           client.sendMessage(infor5.from,"🤖  ```Tag the message to be deleted.```", text, { quoted: xxx });
            resolve()
            return}
        try {
            await client.deleteMessage(infor5.from, {
                id: infor5.stanzaId,
                remoteJid: infor5.from,
            fromMe: true
        })
        resolve()
        } catch (error) {
           
            reject()
        }
       

    })
module.exports.deleteit = deleteit;