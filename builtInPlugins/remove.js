module.exports = {
  name: "remove",
  usage: "remove <@user>",
  desc: "Removes the tagged member from the group.",
  eg: ["remove @ankit", "remove @dibyam"],
  group: true,
  owner: false,
  async handle(Bot) {
    try {
      if (!Bot.isBotGroupAdmins) {
        Bot.replytext(Bot.mess.only.Badmin);
        return;
      }
      if (arg.length == 1) {
        Bot.wrongCommand();
        return;
      }

      if (!Bot.isUserTagged) {
        Bot.wrongCommand();
        return;
      }
      const mentioned = Bot.taggedUser;

      const z = mentioned[0].split("@")[0];
      if (z === `${Bot.client.user.id}`.split("@")[0]) {
        Bot.replytext(Bot.mess.error.error);
        return;
      }
      if (z === Bot.isSuperAdmin) {
        Bot.replytext(Bot.mess.error.error);

        return;
      }

      Bot.client.groupParticipantsUpdate(Bot.from, [mentioned], "remove");

      Bot.replytext(Bot.mess.success);
    } catch (error) {
      Bot.errorlog(error);
    }
  }
};
