/*


String.prototype.hash = function () {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}


String.prototype.hash1 = function () {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash * (2 ** 5)) - hash) + chr;
        hash |= 0;
    }
    return hash;
}




const shell = require('any-shell-escape')
const { exec } = require('child_process')
const ffmpeg = require('ffmpeg-static')
console.log(ffmpeg);
const f = path.join(__dirname, './node_modules/ffmpeg-static/ffmpeg');


const ss = shell([
    f,'-i', '/home/aditya/Videos/tasm.mkv',
    '-y', '-vf', 'fps=1/2', './h/temp%02d.jpg'
])

exec(ss, (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    } else {
        console.info('done!')
    }
})

*/

const path = require('path');


const {
    ai
} = require("./plugins/deepai");


ai(path.join(__dirname,'./assets/stickers/allsticker/s (1).webp')).then((result) => {
    
    console.log(result);
    const zz = result.output.detections.length !== 0 ? "\n👙 *Detections* :\n" : " "
    let nsfw = "🔞 *Probability* :  ```" + (result.output.nsfw_score * 100).toFixed(1) + "%```\n" + zz;
    result.output.detections.forEach(function (element) {
        nsfw = nsfw + "\nName : " + element.name + "\n" +
            "Confidence : " + (element.confidence * 100).toFixed(0) + " %\n";
    })
})


