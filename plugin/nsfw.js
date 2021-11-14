const fs = require("fs");
const path = require('path');
const { ai } = require(path.join(__dirname, "../utils/deepai"));

module.exports = {
    "name": "testnsfw",
    "usage": "testnsfw",
    "desc": "Scans the image for nudity using deep ai and returns the result.",
    "eg": [
        "testnsfw"
    ],
    "group": false,
    "owner": false,
    async handle(Infor) {

        if (!process.env.DEEPAI) {
            Infor.noapi()
            return;
        }


        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };
        if ((isMedia && Infor.reply.message.imageMessage) || Infor.isQuotedImage) {
            const encmedia = Infor.isQuotedImage ?
                JSON.parse(JSON.stringify(Infor.reply).replace("quotedM", "m")).message
                    .extendedTextMessage.contextInfo :
                Infor.reply;
            const media = await Infor.client.downloadAndSaveMediaMessage(encmedia, getRandom(''));
            ai(media).then((result) => {
                const zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;

                result.output.detections.forEach(function (element) {
                    nsfw = nsfw + "\nName : " + element.name + "\n" +
                        "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                })

                Infor.replytext(nsfw)
                fs.unlinkSync(media);
                return;

            }).catch((err) => {
                console.log(err);
                fs.unlinkSync(media);

                return;

            });



        }
        else if ((Infor.isMedia && Infor.reply.message.videoMessage) || Infor.isQuotedVideo) {

            ///////////////////////////////////////////////////////


            const encmedia = Infor.isQuotedVideo ?
                JSON.parse(JSON.stringify(Infor.reply).replace("quotedM", "m")).message
                    .extendedTextMessage.contextInfo :
                Infor.reply;
            const media = await Infor.client.downloadAndSaveMediaMessage(encmedia, getRandom(''));
            ai(media).then((result) => {
                const zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;
                result.output.detections.forEach(function (element) {
                    nsfw = nsfw + "\nName : " + element.name + "\n" +
                        "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                })

                Infor.replytext(nsfw)
                fs.unlinkSync(media);
                return;


            }).catch((err) => {
                console.log(err);
                fs.unlinkSync(media);

                return;


            });



            ///////////////////////////////////////////////////////

        }
        else if (Infor.isQuotedSticker) {

            const encmedia =
                JSON.parse(JSON.stringify(Infor.reply).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo;

            const media = await Infor.client.downloadAndSaveMediaMessage(encmedia, getRandom(''));

            ai(media).then((result) => {

                const zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
                let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;
                result.output.detections.forEach(function (element) {
                    nsfw = nsfw + "\nName : " + element.name + "\n" +
                        "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
                })

                Infor.replytext(nsfw)

                fs.unlinkSync(media);
                return;

            }).catch((err) => {
                console.log(err);
                fs.unlinkSync(media);

                return;


            });
        }
        else {
            Infor.reply(Infor.mess.tag)
        }



    }
}