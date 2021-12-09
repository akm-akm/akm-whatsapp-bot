const axios = require("axios");
const path = require("path");
const logo = path.join(__dirname, "../docs/images/akmlogo.mp4");
const thumb = path.join(__dirname, "../docs/images/akmlogo.png");

module.exports = {
  name: "sourcecode",
  usage: "sourcecode",
  desc: "Provids the link to the source code of the bot.",
  eg: ["sourcecode"],
  group: false,
  owner: false,
  async handle(Bot) {
    axios
      .get(`https://api.github.com/repos/akm-akm/akm-whatsapp-bot`)
      .then((response) => {
        let data = response.data;

        msg =
          "🤖 🤖  *AKM  🤖  BOT*  🤖 🤖\n\n" +
          "🤖🤖🤖 *Sourcecode* 🤖🤖🤖\n\n" +
          "🐱 *Github*\n```www.github.com/akm-akm/akm-whatsapp-bot```\n\n" +
          "👨‍💻 *Owner:* ```" +
          data.owner.login +
          "```\n" +
          "💻 *Name:*  ```" +
          data.name +
          "```\n" +
          "🉐 *Language:*     ```" +
          data.language +
          "```\n" +
          "⭐ *Stars:*             ```" +
          data.stargazers_count +
          "```\n" +
          "🔀 *Forks:*             ```" +
          data.forks_count +
          "```\n" +
          "🧰 *Issues:*           ```" +
          data.open_issues +
          "```\n" +
          "🎨 *Watchers:*      ```" +
          data.watchers_count +
          "```\n" +
          "💾 *Size:*               ```" +
          (data.size / 1024).toFixed(0) +
          " KB```\n" +
          "📄 *License:*         ```" +
          data.license.key +
          " ```\n" +
          "\n🤖 🤖 *_Bot made by AKM_* 🤖 🤖";

        Bot.replyvideo(logo, msg, thumb);
      })

      .catch((e) => {
        Bot.errorlog(e);
      });
  },
};
