const request = require('request');
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
const mess = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);
const coderunner = (Infor, client, xxx3) =>
    new Promise(async (resolve, reject) => {
        const xxx = { ...xxx3 };
        const from = Infor.from;
        const arg = Infor.arg;

        const type = Object.keys(xxx.message)[0];
        if (type !== "extendedTextMessage") {
            client.sendMessage(from, mess.tagtext, text, { quoted: xxx });
            resolve()
            return
        } if (process.env.clientId === undefined && process.env.clientSecret === undefined) {
            client.sendMessage(from, "🤖 ```clientId and clientSecret environment variable is not set. Contact the bot owner.```"
                , text, {
                quoted: xxx
            })
            resolve()
            return;
        }
        if (arg.length === 1) {
            Infor.arg = ["help", arg[0]]
            help(Infor, client, xxx, 1);
            resolve()
            return
        } if (!languagecode.includes(arg[1])) {
            Infor.arg = ["help", arg[0]]
            help(Infor, client, xxx, 1);
            resolve()
            return
        }
        try {
            const program = {
                script: xxx.message.extendedTextMessage.contextInfo.quotedMessage.conversation,
                language: arg[1],
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
                    client.sendMessage(from, "🧮 > " + arg[1] + "\n\n" + "```" + output + "```", text, { quoted: xxx });

                });
            resolve()
        } catch (error) {

            reject(Infor)
        }


    })
module.exports.coderunner = coderunner;