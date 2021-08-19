const path = require("path");
const fs = require("fs");
const sql = require(path.join(__dirname, "./ps"));
const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);
const {
  newgroup
} = require(path.join(__dirname, "./newgroup"));
const {
  MessageType
} = require("@adiwajshing/baileys");
const {
  text
} = MessageType;
fs.writeFileSync(path.join(__dirname, "../data/data3.json"), '{"words": ["xxxxxx"]}')
var data3 = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/data3.json")));
setTimeout(() => {
    data3
      = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../data/data3.json")));
}, 60000);
module.exports = async function settingread(arg, from, sender, groupname, client, groupMetadata, stanzaId, isMedia) {
  random = settings.prefixchoice.charAt(
    Math.floor(Math.random() * settings.prefixchoice.length))
  try {

    botdata = await sql.query(
      "select * from botdata;"
    );

    if (from.endsWith("@g.us")) {

      data1 = await sql.query(`select * from groupdata where groupid='${from}';`);
      if (data1.rows.length == 0) {
        if (
          groupMetadata.participants.length < botdata.rows[0].mingroupsize
         ) {
          await client.sendMessage(from, "```Minimum participants required is: ```" + botdata.rows[0].mingroupsize, text);
          client.groupLeave(from);
          return
        }
        console.log("Entering data for group -  " + from + "  " + groupname);
        console.log("Prefix assigned is  " + random);
        console.log("------------------------------");
        if (!(process.env.NODE_ENV === 'development')) newgroup(from, client, random).then(() => console.log("New group!"));
        await sql.query(
          `INSERT INTO groupdata VALUES ('${from}','true','${random}','false','true', '{''}',0,0,false);`
        );
        return settingread(arg, from, sender, groupname)
      }

    }
    from.endsWith("@g.us") ?
      (number = sender.split("@")[0]) :
      (number = from.split("@")[0]);

    data2 = await sql.query(
      `select * from messagecount where phonenumber='${number}';`)
    if (data2.rows.length == 0) {
      console.log("Entering data for  number -" + number);
      console.log("------------------------------");
      await sql.query(`INSERT INTO messagecount VALUES ('${number}', 0, 0, false);`)
      return settingread(arg, from, sender, groupname)
    }


    return (data = {

      from: from,
      arg: from.endsWith("@g.us") ?
        data1.rows[0].useprefix ?
        arg
        .replace(/\s+/g, " ").toLowerCase().startsWith(data1.rows[0].prefix) ?
        arg = (arg.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").slice(1).replace(/^\s+|\s+$/g, "").split(" ")).map(xa => xa.startsWith("https://") || xa.startsWith("http://") || xa.startsWith("www.") || xa.endsWith(".com") || xa.endsWith(".in") || xa.endsWith(".org") || xa.endsWith(".uk") ? xa : xa.toLowerCase()) :
        arg = [] :
        arg =
        (arg.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").split(" ")).map(xa =>
          xa.startsWith("https://") || xa.startsWith("http://") || xa.startsWith("www.") || xa.endsWith(".com") || xa.endsWith(".in") || xa.endsWith(".org") || xa.endsWith(".uk") ? xa : xa.toLowerCase()) : arg.replace(/\s+/g, " ").startsWith('!') || arg.replace(/\s+/g, " ").startsWith('.') || arg.replace(/\s+/g, " ").startsWith('#') || arg.replace(/\s+/g, " ").startsWith('-') ? arg = (arg.slice(1).replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ").split(" ")).map(xa => xa.startsWith("https://") || xa.startsWith("http://") || xa.startsWith("www.") || xa.endsWith(".com") || xa.endsWith(".in") || xa.endsWith(".org") || xa.endsWith(".uk") ? xa : xa.toLowerCase()) : arg = (arg.replace(/\s+/g, " ").split(" ")).map(xa => xa.startsWith("https://") || xa.startsWith("http://") || xa.startsWith("www.") || xa.endsWith(".com") || xa.endsWith(".in") || xa.endsWith(".org") || xa.endsWith(".uk") ? xa : xa.toLowerCase()),
      number: number,
      noofmsgtoday: data2.rows[0].totalmsgtoday,
      totalmsg: data2.rows[0].totalmsg,
      dailylimitover: data2.rows[0].dailylimitover,
      abusepresent: from.endsWith("@g.us") ? data1.rows[0].allowabuse == 0 ? data3.words.filter(e => arg.indexOf(e) !== -1) : [] : data3.words.filter(e => arg.indexOf(e) !== -1),
      canmemberusebot: from.endsWith("@g.us") ? data1.rows[0].membercanusebot == false ? false : true : true,
      isnumberblockedingroup: from.endsWith("@g.us") ? data1.rows[0].banned_users.includes(number) ? 1 : 0 : 0,
      groupdata: from.endsWith("@g.us") ? data1.rows[0] : 0,
      botdata: botdata.rows[0],
      sender: sender,
      stanzaId: stanzaId,
      isMedia: isMedia
    })

  } catch (error) {
    console.log(error);
  }
};