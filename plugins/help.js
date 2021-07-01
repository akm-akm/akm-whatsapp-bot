const fs = require("fs");
const path = require("path");
const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/help.json"))
  );
 function help(arg){

    return data[arg[1]]
    
}

console.log(help(["arg","crypdto"]))
