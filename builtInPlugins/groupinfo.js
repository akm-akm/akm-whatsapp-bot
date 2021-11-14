const http = require("http");

module.exports = {
  name: "groupinfo",
  usage: "groupinfo",
  desc: "Provides all the information about setting of the group.",
  eg: ["groupinfo"],
  group: true,
  owner: false,
  async handle(Xxxbot) {
    const grpdata =
      "\n💮 *Title* : " +
      "*" +
      Xxxbot.groupMetadata.subject +
      "*" +
      "\n\n🏊 *Member* : " +
      "```" +
      Xxxbot.groupMetadata.participants.length +
      "```" +
      "\n🏅 *Admins*  : " +
      "```" +
      Xxxbot.groupAdmins.length +
      "```" +
      "\n🎀 *Prefix*      : " +
      "```" +
      Xxxbot.groupdata.prefix +
      "```" +
      "\n💡 *Useprefix*        : " +
      "```" +
      Xxxbot.groupdata.useprefix +
      "```" +
      "\n🐶 *Autosticker*    : " +
      "```" +
      Xxxbot.groupdata.autosticker +
      "```" +
      "\n🤖 *Botaccess*      : " +
      "```" +
      Xxxbot.groupdata.membercanusebot +
      "```" +
      "\n🌏 *Filterabuse*     : " +
      "```" +
      Xxxbot.groupdata.allowabuse +
      "```" +
      "\n⚠️ *NSFW detect*  : " +
      "```" +
      Xxxbot.groupdata.nsfw +
      "```" +
      "\n🎫 *Credits used*  : " +
      "```" +
      Xxxbot.groupdata.totalmsgtoday +
      "```" +
      "\n🧶 *Total credits*  : " +
      "```" +
      Xxxbot.botdata.dailygrouplimit +
      "```" +
      "\n🚨 *Banned users* : " +
      "```" +
      (Number(Xxxbot.groupdata.banned_users.length) - 1) +
      "```\n";

    try {
      const ppUrl = await Xxxbot.client.getProfilePicture(from);
      ran = getRandom(".jpeg");
      const file = fs.createWriteStream(ran);
      http.get(ppUrl, function (response) {
        response.pipe(file);
        file.on("finish", function () {
          file.close(async () => {
            await Xxxbot.replyimage(ran, grpdata);
            fs.unlinkSync(ran);
          });
        });
      });
    } catch (error) {
      Xxxbot.replytext(grpdata);
    }
  },
};
