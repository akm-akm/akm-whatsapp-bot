const deepai = require('deepai');
const fs = require('fs');
let eresp = {
    output: { 
        nsfw_score : 0
    }
};
deepai.setApiKey(process.env.DEEPAI);
const ai=(imgpath)=> new Promise((resolve,reject)=>{
    deepai.callStandardApi("nsfw-detector", {
        image: fs.createReadStream(imgpath),
    }).then((resp) => {
    resolve(resp);
    }).catch((err) => {
        console.log("deepai error", err);
        resolve(eresp);
    });
})
module.exports.ai = ai;