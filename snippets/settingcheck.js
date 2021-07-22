const path = require("path");
const fs = require("fs");
const sql = require(path.join(__dirname, "./ps"));
const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);
const abuse = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/abuse.json"))
);

const {newgroup} = require(path.join(__dirname, "./newgroup"));
const {
  MessageType
} = require("@adiwajshing/baileys");
const {
  text,
  
} = MessageType;

module.exports = async function settingread(arg, from, sender, groupname,client,groupMetadata,stanzaId) {
 
  random=settings.prefixchoice.charAt(
    Math.floor(Math.random() * settings.prefixchoice.length))
  try {


 if(from.endsWith("@g.us")){

   // console.log("searching data for group -  " + groupname);
   // console.log("------------------------------");

    data1 = await sql.query(`select * from groupdata where groupid='${from}';`);
    if (data1.rows.length == 0) {
    //if (groupMetadata.participants.length<30) { await client.sendMessage(from,"```Get atleast 30 members.```",text);  client.groupLeave(from); return }
      console.log("Entering data for group -  "+from +"  " + groupname);
      console.log("------------------------------");
      newgroup(from,client,random).then((resolve)=>console.log("new update sent"));
      await  sql.query(
        `INSERT INTO groupdata VALUES ('${from}','${random}','false','true', '{''}');`
      );
      return settingread(arg, from, sender, groupname)
    }

  }
    from.endsWith("@g.us")
    ? (number = sender.split("@")[0])
    : (number = from.split("@")[0]);
  //  console.log("searching data for  number -" + number);
  //  console.log("------------------------------");

    data2 = await sql.query(
      `select * from messagecount where phonenumber='${number}';`)
    if(data2.rows.length==0){ 
      console.log("Entering data for  number -" + number);
      console.log("------------------------------");

    await  sql.query( `INSERT INTO messagecount VALUES ('${number}', 0);`)
      return settingread(arg, from, sender, groupname)
    }
    


  return  (data = {
  
      from:from,
      arg: from.endsWith("@g.us")
        ? arg
            .replace(/\s+/g, " ")
            .toLowerCase()
            .startsWith(data1.rows[0].prefix)
          ? arg=(arg.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").slice(1).replace(/^\s+|\s+$/g, "").split(" ")).map(xa => xa.startsWith("https://"||"http://"||"www.")||xa.endsWith(".com"||".in"||".org"||".uk")?xa:xa.toLowerCase())
          :  arg=[]
        :  
        arg =( arg.replace(/\s+/g, " ").split(" ")).map(xa => xa.startsWith("https://"||"http://"||"www.")||xa.endsWith(".com"||".in"||".org"||".uk")?xa:xa.toLowerCase()),
      number:number,  
      noofmsgtoday: data2.rows[0].totalmsgtoday,
      abusepresent:from.endsWith("@g.us")?data1.rows[0].allowabuse==0? abuse.abuse.filter(e => arg.indexOf(e) !== -1):[]:abuse.abuse.filter(e => arg.indexOf(e) !== -1),
      isnumberblockedingroup:from.endsWith("@g.us")? data1.rows[0].banned_users.includes(number) ? 1 : 0:0,
      groupdata: from.endsWith("@g.us") ? data1.rows[0] : 0,
      sender:sender,
      stanzaId:stanzaId
    })



  } catch (error) {
    await sql.query(
      "CREATE TABLE IF NOT EXISTS groupdata (groupid TEXT, prefix TEXT, allowabuse BOOL, membercanusebot BOOL, banned_users TEXT[] );"
    );
    await sql.query(
      "CREATE TABLE IF NOT EXISTS messagecount (phonenumber TEXT, totalmsgtoday TEXT );"
    );
    //settingread(arg, from, sender, groupname)
    console.error(error);
  }
};
