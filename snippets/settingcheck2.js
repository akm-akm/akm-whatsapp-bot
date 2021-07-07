const fs = require("fs");
const path = require("path");
const abuse = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/abuse.json"))
);
const blocked = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/blocked.json"))
);

const groupsetting = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/groupsetting.json"))
);

const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);
var noofmessage=0;

function settingread(arg, from, sender,groupname) {
  try {

 
    fs.readFile(
      path.join(__dirname, "../data/groupsetting.json"),
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else { 
           obj = JSON.parse(data);
          if (from.endsWith("@g.us") && obj[from] == undefined) {
          obj[from] = {
            Name:groupname,
            prefix_assigned: settings.prefixchoice.charAt(Math.floor(Math.random() * 12)),
            allowabuse: 1,
            membercanusebot: 1,
            isnewgroup: 1,
            blockedmembers:[]
          };
          fs.writeFile(
            path.join(__dirname, "../data/groupsetting.json"),
            JSON.stringify(obj, null, "\t"),
            "utf8",
            () => {}
          );
        }
      } return 0;}
    );

   
  

} catch (error) {
    console.log(error)
}
  from.endsWith("@g.us")
    ? (number = sender.split("@")[0])
    : (number = from.split("@")[0]);

    fs.readFile(
      path.join(__dirname, "../data/limit.json"),
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else { 
          obj = JSON.parse(data);
          if (obj[number] == undefined) {
          obj[number] = 0;
          fs.writeFile(
            path.join(__dirname, "../data/limit.json"),
            JSON.stringify(obj, null, "\t"),
            "utf8",
            () => {}
          );
        }
        noofmessage= obj[number]
      }}
    );


    
  
  return (data = {
    from:from,
    arg: from.endsWith("@g.us")
      ? arg
          .replace(/\s+/g, " ")
          .toLowerCase()
          .startsWith(obj[from].prefix_assigned)
        ? arg=(arg.slice(1).replace(/\s+/g, " ").split(" ")).map(xa => xa.startsWith("https://"||"http://"||"www.")?xa:xa.toLowerCase())
        :  arg=[]
      :  
      arg =( arg.replace(/\s+/g, " ").split(" ")).map(xa => xa.startsWith("https://"||"http://"||"www.")?xa:xa.toLowerCase()),
    number:number,  
    noofmsgtoday: noofmessage,
    abusepresent:from.endsWith("@g.us")?obj[from].allowabuse==0? abuse.abuse.filter(e => arg.indexOf(e) !== -1):[]:abuse.abuse.filter(e => arg.indexOf(e) !== -1),
    isnumberblockedingroup:from.endsWith("@g.us")? obj[from].blockedmembers.includes(number) ? 1 : 0:0,
    groupdata: obj[from] || 0,
  });
}


module.exports.settingread = settingread;