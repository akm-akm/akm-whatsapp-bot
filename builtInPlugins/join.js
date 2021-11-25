module.exports = {
  name: "join",
  usage: "join <link>",
  desc: "The bot will join the group with the invite link.",
  eg: [
    "join https://chat.whatsapp.com/JdEuI6JvN4W434RmF",
    "join https://chat.whatsapp.com/Jweve74J434RmF",
  ],
  group: false,
  owner: false,
  async handle(Bot) {
    const arg = Bot.arg;

    if (arg.length == 1) {
      Bot.wrongCommand();
      return;
    }
    if (!arg[1].includes("https://chat.whatsapp.com/")) {
      Bot.replytext(Bot.mess.error.invalid);
      return;
    }
    try {
      await Bot.client.acceptInvite(arg[1].split(".com/")[1]);
      Bot.replytext(Bot.mess.success);
    } catch (error) {
      Bot.replytext(Bot.mess.error.error);
    }
  },
};
