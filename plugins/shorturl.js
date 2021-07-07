const axios = require("axios");

const shorturl = (arg) =>
    new Promise((resolve, reject) => {
        axios({
                method: "POST",
                url: "https://lenk.cf/p/" + encodeURIComponent(arg[1])
            })
            .then((response) => {
                link ="```short url is```" + "\n" +
                    "```https://lenk.cf/```" +
                    "```" +
                    response.data +
                    "```" +
                    "\n\n" +
                    "```API by lenk.cf```";
                resolve(link);
            })
            .catch(() => reject("```server busy```"));
    });

  
module.exports.shorturl = shorturl;
