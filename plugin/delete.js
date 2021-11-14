module.exports = {
  name: "delete",
  usage: "delete",
  desc: "The bot will delete the tagged message.",
  eg: ["delete"],
  group: false,
  owner: false,
  async handle(Xxxbot) {
    if (!Xxxbot.stanzaId) {
      Xxxbot.wrongCommand();
      return;
    }
    try {
      await Xxxbot.client.deleteMessage(Xxxbot.from, {
        id: Xxxbot.stanzaId,
        remoteJid: Xxxbot.from,
        fromMe: true,
      });
    } catch (error) {
      Xxxbot.replytext(Xxxbot.mess.error.error);
    }
  },
};
