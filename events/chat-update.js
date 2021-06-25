const {WAConnection, MessageType} = require("@adiwajshing/baileys");

const client = new WAConnection();

async function chat_update(prefix) {

    client.on("chat-update", async (xxx) => {
      try {

        if(!xxx.hasNewMessage) return
        xxx=xxx.messages.all()[0];
        if(!xxx.messages&&xxx.key&&xxx.key.fromMe && xxx.key.remotejid == "status@broadcast") return
        const content =JSON.stringify(xxx.messages);
        const from = xxx.key.remotejid;
        const type = Object.keys.apply(xxx.messages)[0];
        const{
          text,extendedtext,image,video,sticer
        }=MessageType;
        


      } catch (error) {
        console.log(error)
      }



    })
  }
    module.exports.chat_update = chat_update;
