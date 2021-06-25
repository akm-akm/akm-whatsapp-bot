const { WAConnection } = require("@adiwajshing/baileys");
const client = new WAConnection();
function read(from){
client.chatRead(from); 
client.updatePresence(from, Presence.available);
client.updatePresence(from, Presence.composing);
}
module.exports.read =read;
