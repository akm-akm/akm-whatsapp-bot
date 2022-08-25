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
      let key;
      if (
        Bot.reply.message.extendedTextMessage.contextInfo.participant.split(
          "@"
        )[0] != Bot.botNumber
      ) {
        if (!Bot.isGroup)
          return Bot.replytext("```I can't delete your message in inbox.```");
        if (!Bot.isBotGroupAdmins) return Bot.replytext(Bot.mess.only.Badmin);

        key = {
          id: Bot.stanzaId,
          remoteJid: Bot.from,
          fromMe: false,
          participant:
            Bot.reply.message.extendedTextMessage.contextInfo.participant
        };
      } else {
        key = {
          fromMe: true,
          id: Bot.stanzaId
        };
      }

      await Bot.client.sendMessage(Bot.from, {
        delete: key
      });
    } catch (error) {
      Bot.replytext(Bot.mess.error.error);
    }
  }
};
