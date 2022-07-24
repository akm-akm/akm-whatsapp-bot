module.exports = {
  name: "open",
  usage: "open",
  desc: "Changes the setting so that members can message.",
  eg: ["open"],
  group: true,
  owner: false,
  async handle(Bot) {
    try {
      if (!Bot.isBotGroupAdmins) {
        Bot.replytext(Bot.mess.only.Badmin);

        return;
      }

      Bot.client.groupSettingUpdate(Bot.from, "not_announcement");

      Bot.replytext(Bot.mess.success);
    } catch (error) {
      Bot.errorlog(error);
    }
  }
};
