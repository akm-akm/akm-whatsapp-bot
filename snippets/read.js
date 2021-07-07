
const {
    Presence
  } = require("@adiwajshing/baileys");
  

const read= (client,from) =>new Promise((resolve, reject) => {
client.chatRead(from); 
client.updatePresence(from, Presence.available);
client.updatePresence(from, Presence.composing);
resolve()
})
module.exports.read =read;
