const path = require("path");
const fs = require("fs");
const { help } = require(path.join(__dirname, "./help"));
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/warningmessages.json"))
);const {
    MessageType
} = require("@adiwajshing/baileys");
const joingroup = (infor4, client, xxx3) =>
    new Promise(async(resolve, reject) => {
         let infor5 = { ...infor4 };
        let xxx = { ...xxx3 };
        code = infor5.arg[1];
       
        if (arg.length == 1) {
            infor5.arg = ["help", arg[0]]
            help(infor5, client, xxx, 1);
            reject()
            return
        }
        if (!code.includes("https://chat.whatsapp.com/")) {
            client.sendMessage(infor5.from, mess.error.invalid, MessageType.text, {
                quoted: xxx,
            });
            resolve()
            return
        }
      try {
        await client.acceptInvite(code.split(".com/")[1]);
        client.sendMessage(infor5.from, mess.success, MessageType.text, {
            quoted: xxx,
        });
        resolve();
      } catch (error) {
          reject(infor5)

      }
       
    });
module.exports.joingroup = joingroup;
