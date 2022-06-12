module.exports = {
  name: "close",
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
    Bot.client.groupSettingUpdate(Bot.from, "announcement");
    Bot.replytext(Bot.mess.success);
  },
};
