const {
    WAConnection
  } = require("@adiwajshing/baileys");
const fs =require("fs");

async function auth() {

    const client = new WAConnection();
    client.on("qr",()=>{
        
    });
    fs.existsSync("./data/auth.json") && client.loadAuthInfo("./data/auth.json");
    await client.connect({
        timeoutMs: 30 * 1000,
      });
    fs.writeFileSync(
        "./data/auth.json",
        JSON.stringify(client.base64EncodedAuthInfo(), null, "\t")
      );  
}


//auth()
module.exports.auth = auth;