module.exports = {
  name: "promote",
  usage: "promote <@user>",
  desc: "Promotes the tagged member as an admin.",
  eg: ["promote @ankit", "promote @dibyam"],
  group: true,
  owner: false,
  async handle(Bot) {
    try {
      return Bot.replytext(Bot.mess.disabled);

      if (!Bot.isBotGroupAdmins) {
        Bot.replytext(Bot.mess.only.Badmin);

        return;
      }
      if (Bot.arg.length == 1) {
        Bot.wrongCommand();
        return;
      }

      if (!Bot.isUserTagged) {
        Bot.wrongCommand();
        return;
      }
      const mentioned = Bot.taggedUser;
      const z = mentioned[0].split("@")[0];
      if (z == Bot.botNumber) {
        Bot.replytext(Bot.mess.error.error);
        return;
      }

      Bot.client.groupParticipantsUpdate(Bot.from, [mentioned], "promote");

      Bot.replytext(Bot.mess.success);
    } catch (error) {
      Bot.errorlog(error);
    }
  }
};
