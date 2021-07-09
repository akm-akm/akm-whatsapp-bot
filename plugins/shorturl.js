const axios = require("axios");
const { MessageType } = require("@adiwajshing/baileys");
const { text, extendedtext, image, video, sticker, audio } = MessageType;

const shorturl = (infor) =>
    new Promise((resolve, reject) => {
        arg     = infor.arg

        axios({
                method: "POST",
                url: "https://lenk.cf/p/" + encodeURIComponent(arg[1])
            })
            .then((response) => {
                if(response.data=='Invalid URL') resolve("```Wrong URL```")
                msg ="```short url is```" + "\n" +
                    "```https://lenk.cf/```" +
                    "```" +
                    response.data +
                    "```" +
                    "\n\n" +
                    "```API by lenk.cf```";
                resolve(msg);
            })
            .catch(() => reject("```server busy```"));
    });

  
module.exports.shorturl = shorturl;
