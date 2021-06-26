const {
  WAConnection,
  MessageType,
  Presence,
  Mimetype,
  GroupSettingChange,
} = require("@adiwajshing/baileys");
const path = require("path");

const fs = require("fs");
console.clear()
const { auth } = require("./events/authentication");
const { chat_update } = require("./events/chat-update");

const client = new WAConnection();

async function main() {
  console.log("started");
  await auth()
  chat_update()
}

main();

