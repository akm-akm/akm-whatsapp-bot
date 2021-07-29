const path = require("path");
const fs = require("fs");
const { MessageType } = require("@adiwajshing/baileys");
const { sticker } = MessageType;

const savedsticker= (infor,client,xxx) => new Promise((resolve, reject) => {
    arg = infor.arg
    from=infor.from;
var random;
    if(arg[0]=="rashmika"){
        random = Math.floor(Math.random() * 304 + 1);
          ran = path.join(__dirname, "../media/stickers/rashmika/rashmika (") + random + ").webp";
          
    }
 
    else if(arg[0]=="rs"){
        random = Math.floor(Math.random() * 500 + 1);
        ran = path.join(__dirname, "../media/stickers/allsticker/s (") + random + ").webp";
          
    }
    client.sendMessage(from, fs.readFileSync(ran), sticker, {
        quoted: xxx,
      });
    resolve();
});
module.exports.savedsticker = savedsticker;