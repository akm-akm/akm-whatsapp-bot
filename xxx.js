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
        hash = ((hash *(2 ** 5)) - hash) + chr;
        hash |= 0;
    }
    return hash;
}

const ytdl = require("ytdl-core");


(async () => {
    const info = await ytdl.getInfo(ytdl.getURLVideoID('https://youtu.be/7Y6mroomv5M'));
    console.log(info.videoDetails.thumbnails);
    const a = info.videoDetails.thumbnails.pop().url;
    console.log(a);
})();