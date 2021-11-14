module.exports = {
  name: "remove",
  usage: "remove <@user>",
  //  "desc": "Removes the tagged member from the group.",
  eg: ["remove @ankit", "remove @dibyam"],
  group: true,
  owner: false,
  async handle(Xxxbot) {
    if (!isBotGroupAdmins) {
      Xxxbot.replytext(Xxxbot.mess.only.Badmin);
      return;
    }
    if (arg.length == 1) {
      Xxxbot.wrongCommand();
      return;
    }

    const mentioned =
      Xxxbot.reply.message.extendedTextMessage.contextInfo.mentionedJid;

    if (!mentioned) {
      Xxxbot.wrongCommand();
      return;
    }
    const z = mentioned[0].split("@")[0];
    if (z === `${Xxxbot.client.user.jid}`.split("@")[0]) {
      Xxxbot.replytext(Xxxbot.mess.error.error);
      return;
    }
    if (z === isSuperAdmin) {
      Xxxbot.replytext(Xxxbot.mess.error.error);

      return;
    }

    Xxxbot.client.groupRemove(Xxxbot.from, mentioned);

    Xxxbot.replytext(Xxxbot.mess.success);
  },
};
