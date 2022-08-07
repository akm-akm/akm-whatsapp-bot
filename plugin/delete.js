module.exports = {
  name: "delete",
  usage: "delete",
  desc: "The bot will delete any tagged message. To delete other's message, it needs to be admin.",
  eg: ["delete"],
  group: false,
  owner: false,
  async handle(Bot) {
    try {
      if (!Bot.stanzaId) {
        return Bot.wrongCommand();
      }

      const key = {
        id: Bot.stanzaId,
        remoteJid: Bot.from,
        participant:
          Bot.reply.message.extendedTextMessage.contextInfo.participant,
        fromMe: false
      };
      await Bot.client.sendMessage(Bot.from, {
        delete: key
      });
    } catch (error) {
      Bot.replytext(Bot.mess.only.Badmin);
    }
  }
};
