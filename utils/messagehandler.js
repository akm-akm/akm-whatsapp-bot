const path = require("path");
const fs = require("fs");
const { count } = require(path.join(__dirname, "./count"));

const chalk = require("chalk");
const sql = require(path.join(__dirname, "./ps"));
const commandHandler = new Map();
const plugins = fs.readdirSync(path.join(__dirname, "../plugin"));
for (let file of plugins) {
  const command = require(path.join(__dirname, "../plugin/", `${file}`));
  if (
    command.name &&
    command.usage &&
    command.desc &&
    typeof command.handle === "function" &&
    command.eg &&
    typeof command.group === "boolean" &&
    typeof command.owner === "boolean"
  ) {
    commandHandler.set(command.name, command);
  }
}
const builtInPlugins = fs.readdirSync(
  path.join(__dirname, "../builtInPlugins")
);
for (let file of builtInPlugins) {
  const command = require(path.join(
    __dirname,
    "../builtInPlugins/",
    `${file}`
  ));
  if (
    command.name &&
    command.usage &&
    command.desc &&
    typeof command.handle === "function" &&
    command.eg &&
    typeof command.group === "boolean" &&
    typeof command.owner === "boolean"
  ) {
    commandHandler.set(command.name, command);
  }
}

exports.messagehandler = async (Bot) => {
  /**
   * @param {String} place
   * This stores the place message is received
   */
  const place = Bot.isGroup ? Bot.groupName : "inbox";

  /* This line checks the following- 
    (If the message is sent in a group, is the group limit exhausted ?) return
    (Is the message sent in the group more than a word?) continue
    (Is the message sent in a group a media and the autosticker feature turned on?) continue
    */
  if (
    !(
      !Bot.isGroup ||
      (Bot.isGroup &&
        Bot.groupdata.totalmsgtoday <= Bot.botdata.dailygrouplimit &&
        (Bot.arg.length !== 0 ||
          (Bot.isGroup && Bot.isMedia && Bot.groupdata.autosticker)))
    )
  )
    return;

  /* This line checks the following-
    (is the message sent in a group?) and
    (is the user sending the message banned in that group to use the bot?)
    If yes then return
    */
  if (Bot.isGroup && Bot.groupdata.banned_users.includes(Bot.number)) return;

  /* This line checks the following-
    (is the message sent in a group?) and
    (Can non admins use the bot in the group?)
    (If non admins cannot use the bot then is the sender an admin or a bot moderator?)
    If yes then continue
    */
  if (
    Bot.isGroup &&
    Bot.groupdata.membercanusebot === false &&
    !Bot.isGroupAdmins
  )
    return;

  /* This line checks the following-
    (is the message sent 'limit' ?)
    If yes then send back the credits used
    */
  if (Bot.arg[0] === "limit") {
    const x =
      Bot.mess.limit + Bot.noofmsgtoday + " / *" + Bot.botdata.dailylimit + "*";
    Bot.replytext(x);
    return;
  }

  /* This line checks the following-
    (IS the number of message sent by the bot less than the daily limit) and
    (the sender is not bot moderator) and
    (the sender is not the owner) and
    (Daily limity is not over)
    If yes then continue
    */
  if (
    Bot.noofmsgtoday >= Bot.botdata.dailylimit &&
    !Bot.isBotModerator &&
    Bot.dailylimitover === false
  ) {
    sql.query(
      `UPDATE messagecount SET dailylimitover = true WHERE phonenumber ='${Bot.number}';`
    );
    Bot.replytext(Bot.mess.userlimit);
    return;
  }

  /* This line checks the following-
    (Is the daily limit over?)
    If yes then return true
    */
  if (Bot.dailylimitover === true) return;

  if (
    Bot.isGroup &&
    Bot.groupdata.totalmsgtoday >= Bot.botdata.dailygrouplimit
  ) {
    Bot.text(Bot.mess.grouplimit);
    count(Bot);
    return;
  }

  console.log(
    "🤖  " +
      chalk.bgRed("[" + Bot.number + "]") +
      "  " +
      chalk.bgGreen("[" + place + "]") +
      "  " +
      chalk.bgBlue("[" + Bot.arg.slice(0, 6).join(" ") + "]")
  );

  if (Bot.abusepresent.length != 0 && !Bot.isBotModerator) {
    Bot.replytext("⚠️  ```" + Bot.abusepresent.join(" ") + "```");
    count(Bot);
    return;
  }

  if (
    Bot.isGroup &&
    Bot.groupdata.autosticker &&
    Bot.isMedia &&
    Bot.arg[0] !== "sticker" &&
    Bot.arg[0] !== "testnsfw"
  ) {
    commandHandler.get("sticker").handle(Bot);
    count(Bot);
    return;
  }

  if (
    Bot.arg == "hi" ||
    Bot.arg == "hey" ||
    Bot.arg == "hello" ||
    Bot.arg == "helloo" ||
    Bot.arg == "hellooo" ||
    Bot.arg == "hii" ||
    Bot.arg == "hiii" ||
    Bot.arg == "heyy" ||
    Bot.arg == "heyyy"
  ) {
    Bot.replytext(
      Bot.mess.salutations[
        Math.floor(Math.random() * Bot.mess.salutations.length)
      ]
    );

    count(Bot);
    return;
  }

  if (commandHandler.has(Bot.arg[0])) {
    if (commandHandler.get(Bot.arg[0]).owner && !Bot.isOwner) {
      Bot.replytext(Bot.mess.only.ownerB);
      count(Bot);
      return;
    } else if (commandHandler.get(Bot.arg[0]).owner && Bot.isOwner) {
      commandHandler.get(Bot.arg[0]).handle(Bot);
      count(Bot);
      return;
    } else if (commandHandler.get(Bot.arg[0]).group && !Bot.isGroup) {
      Bot.replytext(Bot.mess.only.group);
      count(Bot);
      return;
    } else if (
      commandHandler.get(Bot.arg[0]).group &&
      Bot.isGroup &&
      !Bot.isGroupAdmins
    ) {
      Bot.replytext(Bot.mess.only.admin);
      count(Bot);
    } else if (
      commandHandler.get(Bot.arg[0]).group &&
      Bot.isGroup &&
      Bot.isGroupAdmins
    ) {
      commandHandler.get(Bot.arg[0]).handle(Bot);
      count(Bot);
    } else {
      commandHandler.get(Bot.arg[0]).handle(Bot);
      count(Bot);
      return;
    }
  } else if (
    (Bot.isGroup && Bot.groupdata.useprefix) ||
    (!Bot.isGroup && !Bot.isMedia)
  ) {
    Bot.replytext(Bot.mess.unknowncommand);
    count(Bot);
  }
};
