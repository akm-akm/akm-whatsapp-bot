const read = async (Bot) => {
  const key = Bot.reply.key;
  delete key.fromMe;
  await Bot.client.readMessages([key]);
};
module.exports.read = read;
