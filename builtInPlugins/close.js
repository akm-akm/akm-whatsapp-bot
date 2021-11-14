const { GroupSettingChange } = require("../@adiwajshing/baileys");

module.exports = {
  name: "close",
  //    "usage": "close",
  desc: "Changes the setting so that only admins can message.",
  eg: ["close"],
  group: true,
  owner: false,
  async handle(Xxxbot) {
    if (!Xxxbot.isBotGroupAdmins) {
      Xxxbot.replytext(Xxxbot.mess.only.Badmin);
      return;
    }
    Xxxbot.client.groupSettingChange(
      Xxxbot.from,
      GroupSettingChange.messageSend,
      true
    );
    Xxxbot.replytext(Xxxbot.mess.success);
  },
};
