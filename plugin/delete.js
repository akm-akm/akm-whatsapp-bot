module.exports = {
  name: "delete",
  usage: "delete",
  desc: "The bot will delete its own message that is tagged.",
  eg: ["delete"],
  group: false,
  owner: false,
  async handle(Bot) {
    try {
      if (!Bot.stanzaId) {
        return Bot.wrongCommand();
      }
      const options = {
        // remoteJid: Bot.from,
        fromMe: true,
        id: Bot.stanzaId
      };
      //   console.log(Bot.reply.message.extendedTextMessage.contextInfo);
      await Bot.client.sendMessage(Bot.from, {
        delete: options
      });
    } catch (error) {
      // Bot.replytext(Bot.mess.only.Badmin);
      Bot.replytext(Bot.mess.error.error);
    }
  }
};
