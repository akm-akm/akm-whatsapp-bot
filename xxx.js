


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

/*
console.log(("behnchod".hash()));

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


const infor ={
    groupdata: {
        name: "",
        id: "",
        nsfw: false
    }
}

console.log(infor.groupdata!=0 && infor.groupdata.nsfw);