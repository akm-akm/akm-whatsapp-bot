const path = require("path");

const savedsticker= (arg) => new Promise((resolve, reject) => {
var random;
    if(arg[0]=="rashmika"){
        random = Math.floor(Math.random() * 304 + 1);
          ran = path.join(__dirname, "../media/stickers/rashmika/rashmika (") + random + ").webp";
          
    }
    else if(arg[0]=="keerthy"){
        random = Math.floor(Math.random() * 82 + 1);
        ran = path.join(__dirname, "../media/stickers/keerthy/keerthy (") + random + ").webp";
          
    }
    else if(arg[0]=="rs"){
        random = Math.floor(Math.random() * 931 + 1);
        ran = path.join(__dirname, "../media/stickers/allsticker/s (") + random + ").webp";
          
    }
    resolve(ran);
});
module.exports.savedsticker = savedsticker;