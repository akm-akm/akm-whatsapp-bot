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
    fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);

module.exports = {
    "name": "testnsfw",
    "usage": "testnsfw",
    "desc": "Scans the image for nudity using deep ai and returns the result.",
    "eg": [
        "testnsfw"
    ],
    handle(Infor, client) {

        new Promise(async (resolve, reject) => {
            const from = Infor.from;
            const content = JSON.stringify(Infor.reply.message);
            const type = Object.keys(Infor.reply.message)[0];
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
                    quoted: Infor.reply
                })
                resolve()
                return;
            }



            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };
            if ((isMedia && Infor.reply.message.imageMessage) || isQuotedImage) {
                const encmedia = isQuotedImage ?
                    JSON.parse(JSON.stringify(Infor.reply).replace("quotedM", "m")).message
                        .extendedTextMessage.contextInfo :
                    Infor.reply;
                const media = await client.downloadAndSaveMediaMessage(encmedia, getRandom(''));
                ai(media).then((result) => {
                    const zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                    let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;

                    result.output.detections.forEach(function (element) {
                        nsfw = nsfw + "\nName : " + element.name + "\n" +
                            "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                    })

                    client.sendMessage(from, nsfw, text, {
                        quoted: Infor.reply
                    });
                    resolve();
                    fs.unlinkSync(media);
                    return;

                }).catch((err) => {
                    console.log(err);
                    reject(Infor)
                    fs.unlinkSync(media);

                    return;

                });



            }
            else if ((isMedia && Infor.reply.message.videoMessage) || isQuotedVideo) {

                ///////////////////////////////////////////////////////


                const encmedia = isQuotedVideo ?
                    JSON.parse(JSON.stringify(Infor.reply).replace("quotedM", "m")).message
                        .extendedTextMessage.contextInfo :
                    Infor.reply;
                const media = await client.downloadAndSaveMediaMessage(encmedia, getRandom(''));
                ai(media).then((result) => {
                    const zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                    let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;
                    result.output.detections.forEach(function (element) {
                        nsfw = nsfw + "\nName : " + element.name + "\n" +
                            "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                    })

                    client.sendMessage(from, nsfw, text, {
                        quoted: Infor.reply
                    });
                    resolve();
                    fs.unlinkSync(media);
                    return;


                }).catch((err) => {
                    console.log(err);
                    fs.unlinkSync(media);

                    reject(Infor)
                    return;


                });



                ///////////////////////////////////////////////////////

            }
            else if (isQuotedSticker) {

                const encmedia =
                    JSON.parse(JSON.stringify(Infor.reply).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo;

                const media = await client.downloadAndSaveMediaMessage(encmedia, getRandom(''));

                ai(media).then((result) => {

                    const zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                    let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;
                    result.output.detections.forEach(function (element) {
                        nsfw = nsfw + "\nName : " + element.name + "\n" +
                            "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                    })

                    client.sendMessage(from, nsfw, text, {
                        quoted: Infor.reply
                    });
                    resolve();
                    fs.unlinkSync(media);
                    return;

                }).catch((err) => {
                    console.log(err);
                    reject(Infor)
                    fs.unlinkSync(media);

                    return;


                });
            }
            else {
                client.sendMessage(Infor.from, mess.tag, text, {
                    quoted: Infor.reply
                });
            }


        })

    }
}