module.exports = {
  // name: "promote",
  usage: "promote <@user>",
  desc: "Promotes the tagged member as an admin.",
  eg: ["promote @ankit", "promote @dibyam"],
  group: true,
  owner: false,
  async handle(Bot) {
    if (!Bot.isBotGroupAdmins) {
      Bot.replytext(Bot.mess.only.Badmin);

      return;
    }
    if (Bot.arg.length == 1) {
      Bot.wrongCommand();
      return;
    }

    const mentioned = Bot.taggedUser;

    if (!mentioned) {
      Bot.wrongCommand();
      return;
    }
    const z = mentioned[0].split("@")[0];
    if (z == Bot.botNumber) {
      Bot.replytext(Bot.mess.error.error);
      return;
    }

    Bot.client.groupMakeAdmin(Bot.from, mentioned);

    Bot.replytext(Bot.mess.success);
  },
};
