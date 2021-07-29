const path = require("path");
const fs = require("fs");
const sql = require(path.join(__dirname, "./ps"));
const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);
const abuse = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/abuse.json"))
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

module.exports = async function settingread(arg, from, sender, groupname, client, groupMetadata, stanzaId) {

  random = settings.prefixchoice.charAt(
    Math.floor(Math.random() * settings.prefixchoice.length))
  try {


    if (from.endsWith("@g.us")) {

      data1 = await sql.query(`select * from groupdata where groupid='${from}';`);
      if (data1.rows.length == 0) {
       // if (groupMetadata.participants.length < process.env.MIN_GROUP_SIZE) { await client.sendMessage(from,"```Minimum participants required is ```",text);  client.groupLeave(from); return }
        console.log("Entering data for group -  " + from + "  " + groupname);
        console.log("Prefix assigned is  " + random);
        console.log("------------------------------");
        if (!(process.env.NODE_ENV === 'development')) newgroup(from, client, random).then(() => console.log("New group!"));
        await sql.query(
          `INSERT INTO groupdata VALUES ('${from}','${random}','false','true', '{''}',0,0);`
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
      await sql.query(`INSERT INTO messagecount VALUES ('${number}', 0, 0);`)
      return settingread(arg, from, sender, groupname)
    }



    return (data = {

      from: from,
      arg: from.endsWith("@g.us") ?
        arg
        .replace(/\s+/g, " ")
        .toLowerCase()
        .startsWith(data1.rows[0].prefix) ?
        arg = (arg.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").slice(1).replace(/^\s+|\s+$/g, "").split(" ")).map(xa => xa.startsWith("https://") || xa.startsWith("http://") || xa.startsWith("www.") || xa.endsWith(".com") || xa.endsWith(".in") || xa.endsWith(".org") || xa.endsWith(".uk") ? xa : xa.toLowerCase()) :
        arg = [] : arg.replace(/\s+/g, " ").startsWith('!') || arg.replace(/\s+/g, " ").startsWith('.') || arg.replace(/\s+/g, " ").startsWith('#') || arg.replace(/\s+/g, " ").startsWith('-') ? arg = (arg.slice(1).replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ").split(" ")).map(xa => xa.startsWith("https://") || xa.startsWith("http://") || xa.startsWith("www.") || xa.endsWith(".com") || xa.endsWith(".in") || xa.endsWith(".org") || xa.endsWith(".uk") ? xa : xa.toLowerCase()) : arg = (arg.replace(/\s+/g, " ").split(" ")).map(xa => xa.startsWith("https://") || xa.startsWith("http://") || xa.startsWith("www.") || xa.endsWith(".com") || xa.endsWith(".in") || xa.endsWith(".org") || xa.endsWith(".uk") ? xa : xa.toLowerCase()),
      number: number,
      noofmsgtoday: data2.rows[0].totalmsgtoday,
      totalmsg: data2.rows[0].totalmsg,
      abusepresent: from.endsWith("@g.us") ? data1.rows[0].allowabuse == 0 ? abuse.abuse.filter(e => arg.indexOf(e) !== -1) : [] : abuse.abuse.filter(e => arg.indexOf(e) !== -1),
      canmemberusebot: from.endsWith("@g.us") ? data1.rows[0].membercanusebot == false ? false : true : true,
      isnumberblockedingroup: from.endsWith("@g.us") ? data1.rows[0].banned_users.includes(number) ? 1 : 0 : 0,
      groupdata: from.endsWith("@g.us") ? data1.rows[0] : 0,
      sender: sender,
      stanzaId: stanzaId
    })



  } catch (error) {
    console.log(error);
    await sql.query(
      "CREATE TABLE IF NOT EXISTS groupdata (groupid TEXT, prefix TEXT, allowabuse BOOL, membercanusebot BOOL, banned_users TEXT[], totalmsgtoday INT, totalmsg INT);"
    );
    sql.query(
      "CREATE TABLE IF NOT EXISTS messagecount (phonenumber TEXT, totalmsgtoday INT, totalmsg INT);"
    );
    console.error(error);
  }
};