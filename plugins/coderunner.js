var request = require('request');
const fs = require("fs");
const path = require("path");
const { help } = require(path.join(__dirname, "./help"));
const languagecode = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/languages.json"))
);

const {
    MessageType
} = require("@adiwajshing/baileys");
const {
    text
} = MessageType

const coderunner = (infor4, client, xxx3) =>
    new Promise(async (resolve, reject) => {
        let infor5 = { ...infor4 };
        let xxx = { ...xxx3 };
        const type = Object.keys(xxx.message)[0];
        if (type !== "extendedTextMessage") {
            client.sendMessage(infor5.from, "🤖  ```Tag the code to run. See help to understand the syntax.```", text, { quoted: xxx });
            resolve()
            return
        }
        if (arg.length === 1) {
            infor.arg = ["help", arg[0]]
            help(infor, client, xxx, 1);
            reject()
            return
        } if (!languagecode.includes(arg[1])) {
            client.sendMessage(infor5.from, "🤖 ```No such language. See help to understand the syntax.```", text, {
                quoted: xxx,
            });
            resolve();
            return
        }
        try {
            var program = {
                script: xxx.message.extendedTextMessage.contextInfo.quotedMessage.conversation,
                language:  arg[1],
                versionIndex: "0",
                stdin: arg.slice(2).join(' '),
                clientId: process.env.clientId,
                clientSecret: process.env.clientSecret
            };
            request({
                url: 'https://api.jdoodle.com/v1/execute',
                method: "POST",
                json: program
            },
                function (error, response, body) {
                    output = body.output
                    client.sendMessage(infor5.from, "🧮 > " + arg[1] +"\n\n"+"```"+ output+"```", text, { quoted: xxx });
                    console.log('body:', body);
                });
                resolve()
        } catch (error) {

            reject()
        }


    })
module.exports.coderunner = coderunner;