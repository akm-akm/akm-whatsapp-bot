const path = require("path");
const fs = require("fs");
const chalk = require('chalk');
const sql = require(path.join(__dirname, "./ps"));
const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);
const {
  newgroup
} = require(path.join(__dirname, "./newgroup"));

const InforClass = require('./Infor');


let data1, data3 = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/data3.json")));
const urlregex =
  /^(?:(?:https?|http|www):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
Array.prototype.detecta = function () {
  const returnarray = [];
  this.forEach((element, index) => {
    let hash = 0, i, chr;
    if (element.length === 0) return hash;
    for (i = 0; i < element.length; i++) {
      chr = element.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    data3.words.indexOf(hash) != -1 ? returnarray.push(this[index]) : null;
  })
  return returnarray;
}
const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};

module.exports = async function settingread(xxx, client) {

  const Infor = new InforClass();
  Infor.client = client;
  Infor.reply = xxx;
  try {

    const random = settings.prefixchoice.charAt(
      Math.floor(Math.random() * settings.prefixchoice.length))


    const from = xxx.key.remoteJid;
    Infor.from = from;
    Infor.isGroup = from.endsWith("@g.us");
    Infor.sender = Infor.isGroup ? xxx.participant : xxx.key.remoteJid;
    Infor.groupMetadata = Infor.isGroup ? await client.groupMetadata(from) : undefined;
    Infor.groupMembers = Infor.isGroup ? Infor.groupMetadata.participants : undefined;
    Infor.groupAdmins = Infor.isGroup ? getGroupAdmins(Infor.groupMembers) : undefined;
    Infor.isGroupAdmins = Infor.isGroup ? Infor.groupAdmins.includes(Infor.sender) || false : undefined;
    Infor.groupName = Infor.isGroup ? Infor.groupMetadata.subject : undefined;
    Infor.botNumber = client.user.jid.split("@")[0];
    Infor.isBotGroupAdmins = Infor.groupAdmins.includes(`${Infor.botNumber}@s.whatsapp.net`) || false;
    Infor.isOwner = Infor.from == `${process.env.OWNER_NUMBER}@s.whatsapp.net`;
    Infor.isSuperAdmin = Infor.groupMetadata.owner == Infor.from;
  
  
  
    const botdata = await sql.query(
      "select * from botdata;"
    );

    if (Infor.isGroup) {

      data1 = await sql.query(`select * from groupdata where groupid='${from}';`);
      if (data1.rows.length == 0) {

        const groupMetadata = await client.groupMetadata(from);


        if (process.env.NODE_ENV === 'development') {
          console.log("👪  " + chalk.bgCyan("Prefix assigned is / for group " + Infor.groupname));
          await sql.query(
            `INSERT INTO groupdata VALUES ('${from}','true','/','false','true', '{''}',0,0,false,true);`
          );
          return settingread(xxx, client)
        }
        if (process.env.NODE_ENV === 'production') {
          if (
            groupMetadata.participants.length < botdata.rows[0].mingroupsize
          ) {
            await client.sendMessage(from, "*Minimum participants required is* " + botdata.rows[0].mingroupsize, text);
            client.groupLeave(from);
            return
          }
          console.log("👪  " + chalk.bgCyan(`Prefix assigned is '${random}' for group ` + groupname));
          newgroup(from, client, random)
          sql.query(
            `INSERT INTO groupdata VALUES ('${from}','true','${random}','false','true', '{''}',0,0,false,true);`
          );
          return settingread(xxx, client)
        }
      }
    }


    const number = Infor.isGroup ? Infor.sender.split("@")[0] : from.split("@")[0];
    const data2 = await sql.query(
      `select * from messagecount where phonenumber='${number}';`)
    if (data2.rows.length == 0) {
      console.log("👨  " + chalk.bgBlueBright("Entering data for  number -" + number));
      await sql.query(`INSERT INTO messagecount VALUES ('${number}', 0, 0, false);`)
      return settingread(xxx, client)
    }



    const type = Object.keys(xxx.message)[0];
    const content = JSON.stringify(xxx.message);
    try {
      stanzaId =
        type == "extendedTextMessage" ?
          xxx.message.extendedTextMessage.contextInfo
            .stanzaId || undefined :
          0;
    } catch (error) {
      stanzaId = 0;
    }

    let arg =
      type === "conversation" ?
        xxx.message.conversation :
        type === "imageMessage" ?
          xxx.message.imageMessage.caption :
          type === "videoMessage" ?
            xxx.message.videoMessage.caption :
            type == "extendedTextMessage" ?
              xxx.message.extendedTextMessage.text :
              "";

    Infor.isMedia = type === "imageMessage" || type === "videoMessage";
    Infor.arg = Infor.isGroup ? data1.rows[0].useprefix ? arg.replace(/\s+/g, " ").toLowerCase().startsWith(data1.rows[0].prefix) ?
      arg = (arg.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").slice(1).replace(/^\s+|\s+$/g, "").split(" ")).map(xa => urlregex.test(xa) ? xa : xa.toLowerCase()) :
      arg = [] : arg = (arg.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").split(" ")).map(xa =>
        urlregex.test(xa) ? xa : xa.toLowerCase()) : arg.replace(/\s+/g, " ").startsWith('!') || arg.replace(/\s+/g, " ").startsWith('.') || arg.replace(/\s+/g, " ").startsWith('#') || arg.replace(/\s+/g, " ").startsWith('-') ? arg = (arg.slice(1).replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ").split(" ")).map(xa => urlregex.test(xa) ? xa : xa.toLowerCase()) : arg = (arg.replace(/\s+/g, " ").split(" ")).map(xa => urlregex.test(xa) ? xa : xa.toLowerCase());
    Infor.number = number;
    Infor.noofmsgtoday = data2.rows[0].totalmsgtoday;
    Infor.totalmsg = data2.rows[0].totalmsg;
    Infor.dailylimitover = data2.rows[0].dailylimitover;
    Infor.abusepresent = from.endsWith("@g.us") ? data1.rows[0].allowabuse == 0 ? arg.detecta() : [] : arg.detecta();
    Infor.groupdata = from.endsWith("@g.us") ? data1.rows[0] : 0;
    Infor.botdata = botdata.rows[0];
    Infor.stanzaId = stanzaId;
    Infor.isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage");
    Infor.isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage");
    Infor.isQuotedText = type == "extendedTextMessage" && content.includes("text") && content.includes("stanzaId");
    Infor.quotedMessage = Infor.isQuotedText ? Infor.reply.message.extendedTextMessage.contextInfo.quotedMessage.conversation : undefined;
    Infor.isUserTagged = type == "extendedTextMessage" && content.includes("text") && content.includes("mentionedJid");
    Infor.taggedUser = Infor.isUserTagged ? xxx.message.extendedTextMessage.contextInfo.mentionedJid : undefined;
    Infor.isBotModerator = Infor.botdata.moderators.includes(Infor.number)

    return Infor;

  } catch (error) {
    console.log(error);
    // Infor.errorlog(error);
  }
};