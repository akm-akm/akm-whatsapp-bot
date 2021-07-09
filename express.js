const express = require("express");
const { auth } = require("./events/authentication");
const { WAConnection } = require("@adiwajshing/baileys");
var QRCode = require('qrcode')
const client = new WAConnection();
const server = new express();
const port = 3000;
const fs = require("fs");
const path = require("path");
server.listen(port, () => {
  console.clear();
  console.log("\nrunnning on http://localhost:8000\n");
});
console.clear()

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/site/index.html"));
});
server.get("/login", async (req, res) => {
  
 
  client.logger.level = "warn";
  client.on("qr", (zzz) => {
    console.log(zzz);
    res.send(zzz);
  });
  fs.existsSync("./data/auth.json") && client.loadAuthInfo("./data/auth.json");
  await client.connect({
    timeoutMs: 30 * 1000,
  });
  fs.writeFileSync(
    "./data/auth.json",
    JSON.stringify(client.base64EncodedAuthInfo(), null, "\t")
  );
  res.send(aa);
});




server.get("/logout", async (req, res) => {
  client.close(
    fs.unlink("./data/auth.json",()=>{})
    )
    console.log("logged out")
  })
  


server.get("/restart", async (req, res) => {
  console.clear()
  process.exit(0)
})