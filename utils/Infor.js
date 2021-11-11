const { Mimetype, MessageType } = require("@adiwajshing/baileys");
const fs = require('fs');
const chalk = require('chalk');

module.exports = class InforClass {
    constructor(isGroup, from, arg, number, noofmsgtoday, totalmsg, dailylimitover, abusepresent, groupdata, botdata, sender, stanzaId, isMedia, reply, client, isQuotedImage, isQuotedVideo, isQuotedText, quotedMessage, groupMetadata, groupMembers, groupAdmins, isGroupAdmins, groupName ) {
        this.client = client;
        this.from = from;
        this.arg = arg;
        this.number = number;
        this.noofmsgtoday = noofmsgtoday;
        this.totalmsg = totalmsg;
        this.dailylimitover = dailylimitover;
        this.abusepresent = abusepresent;
        this.groupdata = groupdata;
        this.botdata = botdata;
        this.sender = sender;
        this.stanzaId = stanzaId;
        this.isMedia = isMedia;
        this.isGroup = isGroup;
        this.reply = reply;
        this.isQuotedImage = isQuotedImage;
        this.isQuotedVideo = isQuotedVideo;
        this.isQuotedText = isQuotedText;
        this.quotedMessage = quotedMessage;
        this.groupName = groupName;
        this.groupMetadata = groupMetadata;
        this.groupMembers = groupMembers;
        this.groupAdmins = groupAdmins;
        this.isGroupAdmins = isGroupAdmins;


    }

    noapi() {
        this.client.sendMessage(this.from, "🔑  ```API key not set```", MessageType.text, {
            quoted: this.reply,
        })
    }

    replytext(input) {
        this.client.sendMessage(this.from, input, MessageType.text, {
            quoted: this.reply,
            detectLinks: false,
        })
    }


    replysticker(path) {
        this.client.sendMessage(this.from, fs.readFileSync(path), MessageType.sticker, {
            quoted: this.reply,
        })
    }

    replyimage(path, caption) {
        this.client.sendMessage(this.from, fs.readFileSync(path), MessageType.image, {
            quoted: this.reply,
            caption: caption,
            detectLinks: false,
            mimetype: Mimetype.jpeg
        })
    }
    replyvideo(path, caption, thumb) {
        this.client.sendMessage(this.from, fs.readFileSync(path), MessageType.video, {
            quoted: this.reply,
            caption: caption,
            mimetype: Mimetype.mp4,
            detectLinks: false,
            thumbnail: fs.readFileSync(thumb)

        })
    }

    errorlog(error) {
        if (process.env.NODE_ENV !== "production") {
            console.log(chalk.red.bold(error));
        } else {
            const e = "🤖 Error log for the tagged message \n\n```" + error + "```";
            this.client.sendMessage(`${process.env.OWNER_NUMBER}@s.whatsapp.net`, e, MessageType.text, {
                quoted: this.reply,
                detectLinks: false,
            })
        }
    }




    help() {
        
    }
}