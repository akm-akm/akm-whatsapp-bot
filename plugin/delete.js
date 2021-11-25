module.exports = {
  name: "delete",
  usage: "delete",
  desc: "The bot will delete the tagged message.",
  eg: ["delete"],
  group: false,
  owner: false,
  async handle(Bot) {
    if (!Bot.stanzaId) {
      Bot.wrongCommand();
      return;
    }
    try {
      await Bot.client.deleteMessage(Bot.from, {
        id: Bot.stanzaId,
        remoteJid: Bot.from,
        fromMe: true,
      });
    } catch (error) {
      Bot.replytext(Bot.mess.error.error);
    }
  },
};
