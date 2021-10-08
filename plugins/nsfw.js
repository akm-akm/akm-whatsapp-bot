const fs = require("fs");
const path = require('path');
const {
    MessageType
} = require("@adiwajshing/baileys");
const {
    text,

} = MessageType;
const {
    ai
} = require("./deepai");
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);
const nsfw = (infor4, client, xxx3) =>

    new Promise(async (resolve, reject) => {
        const infor5 = { ...infor4 };
        const xxx = { ...xxx3 };
        const from = infor5.from;
        const content = JSON.stringify(xxx.message);
        const type = Object.keys(xxx.message)[0];
        const isMedia = type === "imageMessage" || type === "videoMessage" || type === "stickerMessage";
        const isQuotedImage =
            type === "extendedTextMessage" && content.includes("imageMessage");
        const isQuotedVideo =
            type === "extendedTextMessage" && content.includes("videoMessage");
        const isQuotedSticker =
            type === 'extendedTextMessage' && content.includes('stickerMessage')

        if (process.env.DEEPAI === undefined) {
            client.sendMessage(from, "🤖 ```DEEPAI environment variable is not set. Contact the bot owner.```"
                , text, {
                quoted: xxx
            })
            resolve()
            return;
        }



        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        if ((isMedia && xxx.message.imageMessage) || isQuotedImage) {
            const encmedia = isQuotedImage ?
                JSON.parse(JSON.stringify(xxx).replace("quotedM", "m")).message
                    .extendedTextMessage.contextInfo :
                xxx;
            const media = await client.downloadAndSaveMediaMessage(encmedia, getRandom(''));
            ai(media).then((result) => {
                const zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;
                
                result.output.detections.forEach(function (element) {
                    nsfw = nsfw + "\nName : " + element.name + "\n" +
                        "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                })

                client.sendMessage(from, nsfw, text, {
                    quoted: xxx
                });
                resolve();
                fs.unlinkSync(media);
                return;

            }).catch((err) => {
                console.log(err);
                reject(infor5)
                fs.unlinkSync(media);

                return;

            });



        }
        else if ((isMedia && xxx.message.videoMessage) || isQuotedVideo) {

            ///////////////////////////////////////////////////////


            const encmedia = isQuotedVideo ?
                JSON.parse(JSON.stringify(xxx).replace("quotedM", "m")).message
                    .extendedTextMessage.contextInfo :
                xxx;
            const media = await client.downloadAndSaveMediaMessage(encmedia, getRandom(''));
            ai(media).then((result) => {
                const zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;
                result.output.detections.forEach(function (element) {
                    nsfw = nsfw + "\nName : " + element.name + "\n" +
                        "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                })

                client.sendMessage(from, nsfw, text, {
                    quoted: xxx
                });
                resolve();
                fs.unlinkSync(media);
                return;


            }).catch((err) => {
                console.log(err);
                fs.unlinkSync(media);

                reject(infor5)
                return;


            });



            ///////////////////////////////////////////////////////

        }
        else if (isQuotedSticker) {

            const encmedia =
                JSON.parse(JSON.stringify(xxx).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo;

            const media = await client.downloadAndSaveMediaMessage(encmedia, getRandom(''));

            ai(media).then((result) => {

                const zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;
                result.output.detections.forEach(function (element) {
                    nsfw = nsfw + "\nName : " + element.name + "\n" +
                        "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                })

                client.sendMessage(from, nsfw, text, {
                    quoted: xxx
                });
                resolve();
                fs.unlinkSync(media);
                return;

            }).catch((err) => {
                console.log(err);
                reject(infor5)
                fs.unlinkSync(media);

                return;


            });
        }
        else {
            client.sendMessage(infor5.from,mess.tag, text, {
                quoted: xxx
            });
        }


    })



module.exports.nsfw = nsfw;