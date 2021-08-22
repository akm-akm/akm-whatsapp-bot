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
        let infor5 = { ...infor4};
        let xxx = {...xxx3};
        const content = JSON.stringify(xxx.message);
        const type = Object.keys(xxx.message)[0];
        const isMedia = type === "imageMessage" || type === "videoMessage";
        const isQuotedImage =
            type === "extendedTextMessage" && content.includes("imageMessage");
        const isQuotedVideo =
            type === "extendedTextMessage" && content.includes("videoMessage");
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
                let zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;
                result.output.detections.forEach(function (element) {
                    nsfw = nsfw+ "\nName : " + element.name + "\n" +
                        "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                })

                client.sendMessage(infor5.from, nsfw, text, {
                    quoted: xxx
                });
                resolve();
                fs.unlinkSync(media);

            }).catch((err) => {
                console.log(err);
                client.sendMessage(infor5.from, "🤖 ```Error```", text, {
                    quoted: xxx
                });
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