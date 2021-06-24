const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
  } = require("@adiwajshing/baileys");
const fs =require("fs");
const { auth } = require("./functions/authentication");
async function main(){
    auth()
}

main()