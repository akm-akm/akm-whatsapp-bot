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
      const options = {
        remoteJid: Bot.botNumber+"@s.whatsapp.net",
        fromMe: true,
        id: Bot.reply.message.extendedTextMessage.contextInfo.stanzaId,
      };
      await Bot.client.sendMessage(Bot.from, {
        delete: options,
      });
    } catch (error) {
      Bot.replytext(Bot.mess.error.error);
    }
  },
};
