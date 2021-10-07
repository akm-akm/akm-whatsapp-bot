const axios = require('axios');
const { MessageType, Mimetype } = require("@adiwajshing/baileys");
const { text, image } = MessageType;
const fs = require("fs");
const path = require("path");
const sourcecode = (infor4, client, xxx3) => new Promise((resolve, reject) => {
    const infor5 = { ...infor4 };
    const xxx = { ...xxx3 };

    const from = infor5.from;
    axios.get(`https://api.github.com/repos/akm-akm/xxx-bot`)
        .then((response) => {
            let data = response.data;

            msg = "\n🤖🤖🤖  *Sourcecode*  🤖🤖🤖\n\n" +
                "🐱 *Github*\n```github.com/akm-akm/xxx-bot```\n\n" +
                "👨‍💻 *Repo Owner:* ```" + data.owner.login + "```\n" +
                "💻 *Repo Name:*  ```" + data.name + "```\n" +
                "🉐 *Language:*     ```" + data.language + "```\n" +
                "⭐ *Stars:*             ```" + data.stargazers_count + "```\n" +
                "🔀 *Forks:*             ```" + data.forks_count + "```\n" +
                "🧰 *Issues:*           ```" + data.open_issues + "```\n" +
                "🎨 *Watchers:*      ```" + data.watchers_count + "```\n" +
                "💾 *Size:*               ```" + (data.size / 1024).toFixed(0) + " KB```\n" +
                "📄 *License:*         ```" + data.license.key + " ```\n" +
                "\n🤖 🤖 *_Bot made by AKM_* 🤖 🤖"
            client.sendMessage(from,
                // fs.readFileSync(path.join(__dirname, "../docs/images/xxxlogo.jpeg"))
                msg, text,
                // image,
                {
                    quoted: xxx,
                    detectLinks: false,
                    //   caption: msg,
                    // mimetype: Mimetype.jpeg
                })
            resolve();

        })
        .catch((e) => {
            console.log(e);
            reject(infor5)

        })
})
module.exports.sourcecode = sourcecode;