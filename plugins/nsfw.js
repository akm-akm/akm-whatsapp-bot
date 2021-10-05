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
        const infor5 = { ...infor4 };
        const xxx = { ...xxx3 };
        const from = infor5.from;
        const content = JSON.stringify(xxx.message);
        const type = Object.keys(xxx.message)[0];
        const isMedia = type === "imageMessage" || type === "videoMessage";
        const isQuotedImage =
            type === "extendedTextMessage" && content.includes("imageMessage");
        const isQuotedVideo =
            type === "extendedTextMessage" && content.includes("videoMessage");
        if (process.env.DEEPAI === undefined) {
            client.sendMessage(from, "🤖 ```DEEPAI environment variable is not set. Contact the bot owner.```"
                , text, {
                quoted: xxx
            })
            resolve()
            return;
        }
        if ((isMedia && !xxx.message.videoMessage) || isQuotedImage) {
            const encmedia = isQuotedImage ?
                JSON.parse(JSON.stringify(xxx).replace("quotedM", "m")).message
                    .extendedTextMessage.contextInfo :
                xxx;
            const media = await client.downloadAndSaveMediaMessage(encmedia);
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

            }).catch((err) => {
                console.log(err);
                reject(infor5)

            });



        }
        else if ((isMedia && xxx.message.videoMessage) || isQuotedVideo) {
            client.sendMessage(infor5.from, "🤖 ```Cannot test on video currently.```", text, {
                quoted: xxx
            });
        }
        else {
            client.sendMessage(infor5.from, "🤖 ```Tag the image or send it with the command.```", text, {
                quoted: xxx
            });
        }


    })



module.exports.nsfw = nsfw;