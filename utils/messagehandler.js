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

exports.messagehandler = async (Xxxbot) => {
  /**
   * @param {String} place
   * This stores the place message is received
   */
  const place = Xxxbot.isGroup ? Xxxbot.groupName : "inbox";

  /* This line checks the following- 
    (If the message is sent in a group, is the group limit exhausted ?) return
    (Is the message sent in the group more than a word?) continue
    (Is the message sent in a group a media and the autosticker feature turned on?) continue
    */
  if (
    !(
      !Xxxbot.isGroup ||
      (Xxxbot.isGroup &&
        Xxxbot.groupdata.totalmsgtoday <= Xxxbot.botdata.dailygrouplimit &&
        (Xxxbot.arg.length !== 0 ||
          (Xxxbot.isGroup && Xxxbot.isMedia && Xxxbot.groupdata.autosticker)))
    )
  )
    return;

  /* This line checks the following-
    (is the message sent in a group?) and
    (is the user sending the message banned in that group to use the bot?)
    If yes then return
    */
  if (Xxxbot.isGroup && Xxxbot.groupdata.banned_users.includes(Xxxbot.number))
    return;

  /* This line checks the following-
    (is the message sent in a group?) and
    (Can non admins use the bot in the group?)
    (If non admins cannot use the bot then is the sender an admin or a bot moderator?)
    If yes then continue
    */
  if (
    Xxxbot.isGroup &&
    Xxxbot.groupdata.membercanusebot === false &&
    !Xxxbot.isGroupAdmins
  )
    return;

  /* This line checks the following-
    (is the message sent 'limit' ?)
    If yes then send back the credits used
    */
  if (Xxxbot.arg[0] === "limit") {
    const x =
      Xxxbot.mess.limit +
      Xxxbot.noofmsgtoday +
      " / *" +
      Xxxbot.botdata.dailylimit +
      "*";
    Xxxbot.replytext(x);
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
    Xxxbot.noofmsgtoday >= Xxxbot.botdata.dailylimit &&
    !Xxxbot.botdata.moderators.includes(Xxxbot.number) &&
    Xxxbot.dailylimitover === false
  ) {
    sql.query(
      `UPDATE messagecount SET dailylimitover = true WHERE phonenumber ='${Xxxbot.number}';`
    );
    Xxxbot.replytext(Xxxbot.mess.userlimit);
  }

  /* This line checks the following-
    (IS the daily limit over?)
    If yes then returntrtuj
    */
  if (Xxxbot.dailylimitover === true) return;

  if (
    Xxxbot.isGroup &&
    Xxxbot.groupdata.totalmsgtoday >= Xxxbot.botdata.dailygrouplimit
  ) {
    Xxxbot.text(Xxxbot.mess.grouplimit);
    count(Xxxbot);
    return;
  }

  console.log(
    "🤖  " +
      chalk.bgRed("[" + Xxxbot.number + "]") +
      "  " +
      chalk.bgGreen("[" + place + "]") +
      "  " +
      chalk.bgBlue("[" + Xxxbot.arg.slice(0, 6).join(" ") + "]")
  );

  if (Xxxbot.abusepresent.length != 0 && !Xxxbot.isBotModerator) {
    Xxxbot.replytext("⚠️  ```" + Xxxbot.abusepresent.join(" ") + "```");
    count(Xxxbot);
    return;
  }

  if (
    Xxxbot.isGroup &&
    Xxxbot.groupdata.autosticker &&
    Xxxbot.isMedia &&
    Xxxbot.arg[0] !== "sticker" &&
    Xxxbot.arg[0] !== "testnsfw"
  ) {
    commandHandler.get("sticker").handle(Xxxbot);
    count(Xxxbot);
    return;
  }

  if (
    Xxxbot.arg == "hi" ||
    Xxxbot.arg == "hey" ||
    Xxxbot.arg == "hello" ||
    Xxxbot.arg == "helloo" ||
    Xxxbot.arg == "hellooo" ||
    Xxxbot.arg == "hii" ||
    Xxxbot.arg == "hiii" ||
    Xxxbot.arg == "heyy" ||
    Xxxbot.arg == "heyyy"
  ) {
    Xxxbot.replytext(
      Xxxbot.mess.salutations[
        Math.floor(Math.random() * Xxxbot.mess.salutations.length)
      ]
    );

    count(Xxxbot);
    return;
  }

  if (commandHandler.has(Xxxbot.arg[0])) {
    if (commandHandler.get(Xxxbot.arg[0]).owner && !Xxxbot.isOwner) {
      Xxxbot.replytext(Xxxbot.mess.only.ownerB);
      count(Xxxbot);
      return;
    } else if (commandHandler.get(Xxxbot.arg[0]).owner && Xxxbot.isOwner) {
      commandHandler.get(Xxxbot.arg[0]).handle(Xxxbot);
      count(Xxxbot);
      return;
    } else if (commandHandler.get(Xxxbot.arg[0]).group && !Xxxbot.isGroup) {
      Xxxbot.replytext(Xxxbot.mess.only.group);
      count(Xxxbot);
      return;
    } else if (
      commandHandler.get(Xxxbot.arg[0]).group &&
      Xxxbot.isGroup &&
      !Xxxbot.isGroupAdmins
    ) {
      Xxxbot.replytext(Xxxbot.mess.only.admin);
      count(Xxxbot);
    } else if (
      commandHandler.get(Xxxbot.arg[0]).group &&
      Xxxbot.isGroup &&
      Xxxbot.isGroupAdmins
    ) {
      commandHandler.get(Xxxbot.arg[0]).handle(Xxxbot);
      count(Xxxbot);
    } else {
      commandHandler.get(Xxxbot.arg[0]).handle(Xxxbot);
      count(Xxxbot);
      return;
    }
  } else if (
    (Xxxbot.isGroup && Xxxbot.groupdata.useprefix) ||
    !Xxxbot.isGroup
  ) {
    Xxxbot.replytext(Xxxbot.mess.unknowncommand);
    count(Xxxbot);
  }
};
