const path = require("path");
const fs = require("fs");
const { MessageType } = require("@adiwajshing/baileys");
const { sticker } = MessageType;

const savedsticker = (infor4, client, xxx3) => new Promise((resolve, reject) => {
    let infor5 = { ...infor4 };
    let xxx = { ...xxx3 };

    arg = infor5.arg
    from=infor5.from;
var random;
    if(arg[0]=="rashmika"){
        random = Math.floor(Math.random() * 304 + 1);
          ran = path.join(__dirname, "../media/stickers/rashmika/rashmika (") + random + ").webp";
          
    }
 
    else if(arg[0]=="rs"){
        random = Math.floor(Math.random() * 500 );
        ran = path.join(__dirname, "../media/stickers/allsticker/s (") + random + ").webp";
          
    }
    client.sendMessage(from, fs.readFileSync(ran), sticker, {
        quoted: xxx,
      });
    resolve();
});
module.exports.savedsticker = savedsticker;