const deepai = require('deepai');
const fs = require('fs');
deepai.setApiKey('68793150-34cb-46a3-9210-1c9f374b39e5');
require('dotenv').config();
const ai = (imgpath) => new Promise((resolve, reject) => {
    deepai.callStandardApi("nsfw-detector", {
        image: fs.createReadStream(imgpath),
    }).then((resp) => {
       // console.log(resp);
        resolve(resp);
    }).catch((err) => {
        console.log(err);
        reject()
    });

})
module.exports.ai = ai;

ai('./media/images/4.jpg')
    .then((resp) => {
        console.log(resp);
    }
)