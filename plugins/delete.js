const { MessageType } = require("@adiwajshing/baileys");
const { text } = MessageType;

const deleteit = (infor, client, xxx) =>
    new Promise(async (resolve, reject) => {
        const type = Object.keys(xxx.message)[0];
       if(type !== "extendedTextMessage") {
            client.sendMessage(infor.from,"```Tag the message to be deleted.```", text, { quoted: xxx });
            resolve()
            return}
        try {
            await client.deleteMessage(infor.from, {
            id: infor.stanzaId,
            remoteJid: infor.from,
            fromMe: true
        })
        resolve()
        } catch (error) {
           
            reject()
        }
       

    })
module.exports.deleteit = deleteit;