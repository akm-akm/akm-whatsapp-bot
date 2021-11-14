module.exports = {
  name: "demote",
  usage: "demote <@user>",
  //  "desc": "Demotes the tagged member from admin.",
  eg: ["demote @ankit", "demote @dibyam"],
  group: true,
  owner: false,
  async handle(Xxxbot) {
    if (!Xxxbot.isBotGroupAdmins) {
      Xxxbot.replytext(Xxxbot.mess.only.Badmin);

      return;
    }
    if (arg.length == 1) {
      Xxxbot.wrongCommand();
      return;
    }

    const mentioned = Xxxbot.taggedUser;

    if (!mentioned) {
      Xxxbot.wrongCommand();
      return;
    }
    const z = mentioned[0].split("@")[0];
    if (z === Xxxbot.botNumber) {
      Xxxbot.replytext(Xxxbot.mess.error.error);
      return;
    }
    if (z === isSuperAdmin) {
      Xxxbot.replytext(Xxxbot.mess.error.error);

      return;
    }

    Xxxbot.client.groupDemoteAdmin(Xxxbot.from, mentioned);

    Xxxbot.replytext(Xxxbot.mess.success);
  },
};
