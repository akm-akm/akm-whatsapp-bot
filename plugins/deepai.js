const deepai = require('deepai');
const fs = require('fs');
const shell = require('any-shell-escape')
const { exec } = require('child_process')
const webp = require('webp-converter');
const path = require('path');
const ffmpeg = path.join(__dirname, '../node_modules/ffmpeg-static/ffmpeg');
const eresp = {
    output: {
        detections: [],
        nsfw_score: 0
    }
};
const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};
deepai.setApiKey(process.env.DEEPAI);


const ai = (input) => new Promise((resolve, reject) => {


    if (!process.env.DEEPAI) {
       resolve(eresp);
        return;
    }
    // to test images 


    if (input.endsWith('.jpg') || input.endsWith('.png') || input.endsWith('.jpeg')) {
        deepai.callStandardApi("nsfw-detector", {
            image: fs.createReadStream(input),
        }).then((resp) => {
            resolve(resp);
            return
        }).catch((err) => {
            resolve(eresp);
            console.log(err);
            return

        });
    }


    // to test sticker

    else if (input.endsWith('.webp')) {
        const ran = getRandom('.jpg');
        webp.dwebp(input, ran, "-o", logging = "-v")
            .then((response) => {
                deepai.callStandardApi("nsfw-detector", {
                    image: fs.createReadStream(ran),
                }).then((resp) => {
                    resolve(resp);
                    return

                }).catch((err) => {
                    resolve(eresp);
                    return
                });

            }).catch((err) => {
                resolve(eresp);
                return
            }
            );
    }


    // to test video

    else {

        const screenshot = shell([ffmpeg, '-i', input, '-y', '-vf', 'fps=1/3', path.join(__dirname, '../assets/temp/temp%02d.jpg')])

        exec(screenshot, async (err) => {
            if (err) {
                resolve(eresp);
                return;
            } else {
                deepai.callStandardApi("nsfw-detector", {
                    image: fs.createReadStream(path.join(__dirname, '../assets/temp/temp02.jpg')),
                }).then((resp) => {
                    resolve(resp);
                    return
                }).catch((err) => {
                    resolve(eresp);
                    return;
                });
            }
        })
    }

})
module.exports.ai = ai;