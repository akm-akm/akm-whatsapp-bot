module.exports = {
  // name: "demote",
  usage: "demote <@user>",
  desc: "Demotes the tagged member from admin.",
  eg: ["demote @ankit", "demote @dibyam"],
  group: true,
  owner: false,
  async handle(Bot) {
    if (!Bot.isBotGroupAdmins) {
      Bot.replytext(Bot.mess.only.Badmin);

      return;
    }
    if (arg.length == 1) {
      Bot.wrongCommand();
      return;
    }

    const mentioned = Bot.taggedUser;

    if (!mentioned) {
      Bot.wrongCommand();
      return;
    }
    const z = mentioned[0].split("@")[0];
    if (z === Bot.botNumber) {
      Bot.replytext(Bot.mess.error.error);
      return;
    }
    if (z === isSuperAdmin) {
      Bot.replytext(Bot.mess.error.error);

      return;
    }

    Bot.client.groupDemoteAdmin(Bot.from, mentioned);

    Bot.replytext(Bot.mess.success);
  },
};
