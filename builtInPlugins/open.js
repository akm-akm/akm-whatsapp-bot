const { GroupSettingChange } = require("../@adiwajshing/baileys");

module.exports = {
  name: "open",
  usage: "open",
  //   "desc": "Changes the setting so that members can message.",
  eg: ["open"],
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
      false
    );

    Xxxbot.replytext(Xxxbot.mess.success);
  },
};
