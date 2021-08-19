const deepai = require('deepai');
const fs = require('fs');
deepai.setApiKey(process.env.DEEPAI);
const ai=(imgpath)=> new Promise((resolve,reject)=>{
    deepai.callStandardApi("nsfw-detector", {
        image: fs.createReadStream(imgpath),
    }).then((resp) => {
         console.log(resp);
    resolve(resp);
    }).catch((err) => {
        console.log("deepai error",err);
        reject()
    });
})
module.exports.ai = ai;
