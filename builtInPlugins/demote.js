module.exports = {
  name: "demote",
  usage: "demote <@user>",
  desc: "Demotes the tagged member from admin.",
  eg: ["demote @ankit", "demote @dibyam"],
  group: true,
  owner: false,
  async handle(Bot) {
    try {
      const arg = Bot.arg;
      if (!Bot.isBotGroupAdmins) {
        Bot.replytext(Bot.mess.only.Badmin);

        return;
      }
      if (arg.length == 1) {
        Bot.wrongCommand();
        return;
      }
      

      const mentioned = Bot.taggedUser;

      if (!Bot.isUserTagged) {
        Bot.wrongCommand();
        return;
      }
      const z = mentioned[0].split("@")[0];
      if (z === Bot.botNumber) {
        Bot.replytext(Bot.mess.error.error);
        return;
      }
      if (z === Bot.isSuperAdmin) {
        Bot.replytext(Bot.mess.error.error);

        return;
      }

      Bot.client.groupParticipantsUpdate(Bot.from, [mentioned], "demote");

      Bot.replytext(Bot.mess.success);
    } catch (error) {
      Bot.errorlog(error);
    }
  }
};
