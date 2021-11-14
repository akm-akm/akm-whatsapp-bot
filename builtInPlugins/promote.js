module.exports = {
  name: "promote",
  //   "usage": "promote <@user>",
  desc: "Promotes the tagged member as an admin.",
  eg: ["promote @ankit", "promote @dibyam"],
  group: true,
  owner: false,
  async handle(Xxxbot) {
    if (!Xxxbot.isBotGroupAdmins) {
      Xxxbot.replytext(Xxxbot.mess.only.Badmin);

      return;
    }
    if (Xxxbot.arg.length == 1) {
      Xxxbot.wrongCommand();
      return;
    }

    const mentioned = Xxxbot.taggedUser;

    if (!mentioned) {
      Xxxbot.wrongCommand();
      return;
    }
    const z = mentioned[0].split("@")[0];
    if (z == Xxxbot.botNumber) {
      Xxxbot.replytext(Xxxbot.mess.error.error);
      return;
    }

    Xxxbot.client.groupMakeAdmin(Xxxbot.from, mentioned);

    Xxxbot.replytext(Xxxbot.mess.success);
  },
};
