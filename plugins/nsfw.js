
const fs = require("fs");
const {
    MessageType
} = require("@adiwajshing/baileys");
const {
    text,
   
} = MessageType;
const {
    ai
} = require("./deepai");
const nsfw = (infor4, client, xxx3) =>
    new Promise(async (resolve, reject) => {
        let infor5 = {
            ...infor4
        };
        let xxx = {
            ...xxx3
        };

        const content = JSON.stringify(xxx.message);
        const type = Object.keys(xxx.message)[0];
        const isMedia = type === "imageMessage" || type === "videoMessage";
        const isQuotedImage =
            type === "extendedTextMessage" && content.includes("imageMessage");

        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };

        if ((isMedia && !xxx.message.videoMessage) || isQuotedImage) {
            const encmedia = isQuotedImage ?
                JSON.parse(JSON.stringify(xxx).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo :
                xxx;
            const media = await client.downloadAndSaveMediaMessage(encmedia);
            ran = getRandom(".webp");
            ai(media).then((result) => {
                client.sendMessage(infor5.from, JSON.stringify(result, null, "\t") , text, {
                    quoted: xxx
                });
                resolve();
                fs.unlinkSync(media);

            }).catch((err) => {

                client.sendMessage(infor5.from, "🤖 ```Error```", text, {
                    quoted: xxx
                });
            });



        }
    });
module.exports.nsfw = nsfw;