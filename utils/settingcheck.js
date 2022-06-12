const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const sql = require(path.join(__dirname, "./ps"));
const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);
const { newgroup } = require(path.join(__dirname, "./newgroup"));

const BotClass = require("./Bot");

let data1,
  data3 = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../data/abuseListHindiAndEnglish.json")
    )
  );
const urlregex =
  /^(?:(?:https?|http|www):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
Array.prototype.detecta = function () {
  const returnarray = [];
  this.forEach((element, index) => {
    let hash = 0,
      i,
      chr;
    if (element.length === 0) return hash;
    for (i = 0; i < element.length; i++) {
      chr = element.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    data3.words.indexOf(hash) != -1 ? returnarray.push(this[index]) : null;
  });
  return returnarray;
};
const getGroupAdmins = (participants) => {
  const admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};

module.exports = async function settingread(xxx, client) {
  const Bot = new BotClass();
  Bot.client = client;
  Bot.reply = xxx;
  try {
    const random = settings.prefixchoice.charAt(
      Math.floor(Math.random() * settings.prefixchoice.length)
    );
    let botNumberJid = client.user.id;
    botNumberJid =
      botNumberJid.slice(0, botNumberJid.search(":")) +
      botNumberJid.slice(botNumberJid.search("@"));

    const from = xxx.key.remoteJid;
    Bot.from = xxx.key.remoteJid;
    Bot.isGroup = from.endsWith("@g.us");
    Bot.sender = Bot.isGroup ? xxx.key.participant : xxx.key.remoteJid;
    const senderNumb = Bot.sender.includes(":")
      ? Bot.sender.split(":")[0]
      : Bot.sender.split("@")[0];

    Bot.groupMetadata = Bot.isGroup
      ? await client.groupMetadata(from)
      : undefined;
    Bot.groupMembers = Bot.isGroup ? Bot.groupMetadata.participants : undefined;
    Bot.groupAdmins = Bot.isGroup
      ? getGroupAdmins(Bot.groupMembers)
      : undefined;
    Bot.groupName = Bot.isGroup ? Bot.groupMetadata.subject : undefined;
    Bot.botNumber = botNumberJid.split("@")[0];
    Bot.isBotGroupAdmins = Bot.isGroup
      ? Bot.groupAdmins.includes(`${Bot.botNumber}@s.whatsapp.net`) || false
      : undefined;
    Bot.isOwner = Bot.isGroup
      ? senderNumb === process.env.OWNER_NUMBER
      : Bot.from.split("@")[0] === process.env.OWNER_NUMBER;
    Bot.isSuperAdmin = Bot.isGroup
      ? Bot.groupMetadata.owner == Bot.from
      : undefined;

    const botdata = await sql.query("select * from botdata;");

    if (Bot.isGroup) {
      data1 = await sql.query(
        `select * from groupdata where groupid='${from}';`
      );
      if (data1.rows.length == 0) {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "👪  " +
              chalk.bgCyan("Prefix assigned is / for group " + Bot.groupName)
          );
          await sql.query(
            `INSERT INTO groupdata VALUES ('${from}','true','/','false','true', '{''}',0,0,false,true);`
          );
          return settingread(xxx, client);
        }
        if (process.env.NODE_ENV === "production") {
          if (
            Bot.groupMetadata.participants.length < botdata.rows[0].mingroupsize
          ) {
            Bot.text(
              "*Minimum participants required is* " +
                botdata.rows[0].mingroupsize
            );
            client.groupLeave(from);
            return;
          }
          console.log(
            "👪  " +
              chalk.bgCyan(
                `Prefix assigned is '${random}' for group ` + Bot.groupName
              )
          );
          newgroup(from, client, random);
          sql.query(
            `INSERT INTO groupdata VALUES ('${from}','true','${random}','false','true', '{''}',0,0,false,true);`
          );
          return settingread(xxx, client);
        }
      }
    }

    const number = Bot.isGroup ? Bot.sender.split("@")[0] : from.split("@")[0];
    const data2 = await sql.query(
      `select * from messagecount where phonenumber='${number}';`
    );
    if (data2.rows.length == 0) {
      console.log(
        "👨  " + chalk.bgBlueBright("Entering data for  number -" + number)
      );
      await sql.query(
        `INSERT INTO messagecount VALUES ('${number}', 0, 0, false);`
      );
      return settingread(xxx, client);
    }

    const type = Object.keys(xxx.message)[0];
    const content = JSON.stringify(xxx.message);
    try {
      stanzaId =
        type == "extendedTextMessage"
          ? xxx.message.extendedTextMessage.contextInfo.stanzaId || undefined
          : 0;
    } catch (error) {
      stanzaId = 0;
    }

    let arg =
      type === "conversation"
        ? xxx.message.conversation
        : type === "imageMessage"
        ? xxx.message.imageMessage.caption
        : type === "videoMessage"
        ? xxx.message.videoMessage.caption
        : type == "extendedTextMessage"
        ? xxx.message.extendedTextMessage.text
        : "";

    Bot.isMedia = type === "imageMessage" || type === "videoMessage";
    Bot.arg = Bot.isGroup
      ? data1.rows[0].useprefix
        ? arg
            .replace(/\s+/g, " ")
            .toLowerCase()
            .startsWith(data1.rows[0].prefix)
          ? (arg = arg
              .replace(/\s+/g, " ")
              .replace(/^\s+|\s+$/g, "")
              .slice(1)
              .replace(/^\s+|\s+$/g, "")
              .split(" ")
              .map((xa) => (urlregex.test(xa) ? xa : xa.toLowerCase())))
          : (arg = [])
        : (arg = arg
            .replace(/\s+/g, " ")
            .replace(/^\s+|\s+$/g, "")
            .split(" ")
            .map((xa) => (urlregex.test(xa) ? xa : xa.toLowerCase())))
      : arg.replace(/\s+/g, " ").startsWith("!") ||
        arg.replace(/\s+/g, " ").startsWith(".") ||
        arg.replace(/\s+/g, " ").startsWith("#") ||
        arg.replace(/\s+/g, " ").startsWith("-")
      ? (arg = arg
          .slice(1)
          .replace(/^\s+|\s+$/g, "")
          .replace(/\s+/g, " ")
          .split(" ")
          .map((xa) => (urlregex.test(xa) ? xa : xa.toLowerCase())))
      : (arg = arg
          .replace(/\s+/g, " ")
          .split(" ")
          .map((xa) => (urlregex.test(xa) ? xa : xa.toLowerCase())));
    Bot.number = number;
    Bot.noofmsgtoday = data2.rows[0].totalmsgtoday;
    Bot.totalmsg = data2.rows[0].totalmsg;
    Bot.dailylimitover = data2.rows[0].dailylimitover;
    Bot.abusepresent = from.endsWith("@g.us")
      ? data1.rows[0].allowabuse == 0
        ? arg.detecta()
        : []
      : arg.detecta();
    Bot.groupdata = from.endsWith("@g.us") ? data1.rows[0] : 0;
    Bot.botdata = botdata.rows[0];
    Bot.stanzaId = stanzaId;
    Bot.isQuotedImage =
      type === "extendedTextMessage" && content.includes("imageMessage");
    Bot.isQuotedVideo =
      type === "extendedTextMessage" && content.includes("videoMessage");
    Bot.isQuotedText =
      type == "extendedTextMessage" &&
      content.includes("text") &&
      content.includes("stanzaId");
    Bot.isQuotedSticker =
      type === "extendedTextMessage" && content.includes("stickerMessage");
    Bot.quotedMessage = Bot.isQuotedText
      ? Bot.reply.message.extendedTextMessage.contextInfo.quotedMessage
          .conversation
      : undefined;
    Bot.isUserTagged =
      type == "extendedTextMessage" &&
      content.includes("text") &&
      content.includes("mentionedJid");
    Bot.taggedUser = Bot.isUserTagged
      ? xxx.message.extendedTextMessage.contextInfo.mentionedJid
      : undefined;
    Bot.isBotModerator =
      Bot.botdata.moderators.includes(Bot.number) || Bot.isOwner;
    Bot.isGroupAdmins = Bot.isGroup
      ? Bot.groupAdmins.includes(Bot.sender) || Bot.isBotModerator || false
      : undefined;

    return Bot;
  } catch (error) {
    console.log(error);
    // Bot.errorlog(error);
  }
};
