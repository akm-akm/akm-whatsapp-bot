const { GroupSettingChange } = require("../@adiwajshing/baileys");

module.exports = {
  // name: "close",
  usage: "close",
  desc: "Changes the setting so that only admins can message.",
  eg: ["close"],
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
      true
    );
    Bot.replytext(Bot.mess.success);
  },
};
