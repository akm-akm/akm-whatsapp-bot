const { time } = require("console");
const path = require("path");
const fs = require("fs");
const sql = require(path.join(__dirname, "./snippets/ps"));
const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/settings.json"))
);
const abuse = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./data/abuse.json"))
);



module.exports = async function settingread(arg, from, sender, groupname) {
 
  random=settings.prefixchoice.charAt(
    Math.floor(Math.random() * 12))
  try {


 if(from.endsWith("@g.us")){

    console.log("searching data for group -  " + groupname);
    console.log("------------------------------");

    data1 = await sql.query(`select * from groupdata where groupid='${from}';`);
    if (data1.rows.length == 0) {
      console.log("Entering data for group -  " + groupname);
      console.log("------------------------------");

      await  sql.query(
        `INSERT INTO groupdata VALUES ('${from}','${groupname}','${random}','true','true','false','true','false','true', '{}');`
      );
      return settingread(arg, from, sender, groupname)
    }

  }
    from.endsWith("@g.us")
    ? (number = sender.split("@")[0])
    : (number = from.split("@")[0]);
    console.log("searching data for  number -" + number);
    console.log("------------------------------");

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
          ? arg=(arg.slice(1).replace(/\s+/g, " ").split(" ")).map(xa => xa.startsWith("https://"||"http://"||"www.")?xa:xa.toLowerCase())
          :  arg=[]
        :  
        arg =( arg.replace(/\s+/g, " ").split(" ")).map(xa => xa.startsWith("https://"||"http://"||"www.")?xa:xa.toLowerCase()),
      number:number,  
      noofmsgtoday: data2.rows[0].totalmsgtoday,
      abusepresent:from.endsWith("@g.us")?data1.rows[0].allowabuse==0? abuse.abuse.filter(e => arg.indexOf(e) !== -1):[]:abuse.abuse.filter(e => arg.indexOf(e) !== -1),
     // isnumberblockedingroup:from.endsWith("@g.us")? data1.rows[0].banned_users.includes(number) ? 1 : 0:0,
      groupdata: from.endsWith("@g.us") ? data1.rows[0] : 0,
    })



  } catch (error) {
    await sql.query(
      "CREATE TABLE IF NOT EXISTS groupdata (groupid TEXT, groupname TEXT, prefix TEXT, allowabuse BOOL, membercanusebot BOOL,autosticker BOOL,stickergroup BOOL, marketgroup BOOL, isnewgroup BOOL );"
    );
    await sql.query(
      "CREATE TABLE IF NOT EXISTS messagecount (phonenumber TEXT, totalmsgtoday INT );"
    );
    //settingread(arg, from, sender, groupname)
    console.error(error);
  }
};
