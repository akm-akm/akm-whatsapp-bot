const fs = require("fs");
const abuse = JSON.parse(fs.readFileSync("../data/abuse.json", 'utf8'));
const blocked = JSON.parse(fs.readFileSync("../data/blocked.json"));
const groupsetting = JSON.parse(fs.readFileSync("../data/groupsetting.json"));
const limit = JSON.parse(fs.readFileSync("../data/limit.json"));
const settings = JSON.parse(fs.readFileSync("../data/settings.json"));
x = abuse.abuse

function settingcheck(arg, from, iggroup) 
{
ii=groupsetting[iggroup]
function isabuse(aarg) 
 {
  return x.forEach(element => {       
    if(aarg.includes(element)) return 1
    }) }

    if(groupsetting[iggroup]==undefined) {
      fs.readFile('../data/groupsetting.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data);
        obj[iggroup]={
          stickergroup:1,
          allowabuse:1,
          prefix:"x",
          autosticker:0,
          cryptogroup:0,
          marketgroup:0 }
        
        fs.writeFile('../data/groupsetting.json',JSON.stringify(obj, null, "\t"), 'utf8',()=>{})
    }})
  return 0}
     
    if(limit[from]==undefined) {
      fs.readFile('../data/limit.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data);
        obj[from]=100
        
        fs.writeFile('../data/limit.json',JSON.stringify(obj, null, "\t"), 'utf8',()=>{})
    }});
    return 0}

 return  data={
    "arg":arg.replace(/\s+/g, " ").toLowerCase().split(" ")[0].startsWith(groupsetting[iggroup].prefix) ? arg= arg.slice(1).replace(/\s+/g, " ").toLowerCase().split(" ") : 0 ,
    "limitleft": 100-limit[from] || null,
    "iggroup":groupsetting[iggroup] || 0,
    "abuse": isabuse(arg)
    }}

  
console.log(
    settingcheck(
      "sticker Pack agggss AUThor 2373",
      "1234",
      "a998722834a"))