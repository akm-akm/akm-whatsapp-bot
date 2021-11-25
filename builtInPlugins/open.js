const { GroupSettingChange } = require("../@adiwajshing/baileys");

module.exports = {
  name: "open",
  usage: "open",
  //   "desc": "Changes the setting so that members can message.",
  eg: ["open"],
  group: true,
  owner: false,
  async handle(Bot) {
    if (!Bot.isBotGroupAdmins) {
      Bot.replytext(Bot.mess.only.Badmin);

      return;
    }

    Bot.client.groupSettingChange(
      Bot.from,
      GroupSettingChange.messageSend,
      false
    );

    Bot.replytext(Bot.mess.success);
  },
};
