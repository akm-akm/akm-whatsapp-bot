module.exports = {
  name: "invite",
  usage: "invite <link>",
  desc: "The bot will join the group with the invite link.",
  eg: ["join "],
  group: false,
  owner: false,
  async handle(Xxxbot) {
    const arg = Xxxbot.arg;

    if (arg.length == 1) {
      Xxxbot.wrongCommand();

      return;
    }
    if (!arg[1].includes("https://chat.whatsapp.com/")) {
      Xxxbot.replytext(Xxxbot.mess.error.invalid);
      return;
    }
    try {
      await Xxxbot.client.acceptInvite(arg[1].split(".com/")[1]);
      Xxxbot.replytext(Xxxbot.mess.success);
    } catch (error) {
      Xxxbot.replytext(Xxxbot.mess.error.error);
    }
  },
};
