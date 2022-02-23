const { Mimetype, MessageType } = require("../@adiwajshing/baileys/lib");
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const mess = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/messages.json"))
);
const pluginsinfo = require(path.join(__dirname, "./pluginInfo"));
module.exports = class BotClass {
  constructor(
    isQuotedSticker,
    botNumber,
    isBotGroupAdmins,
    isGroup,
    from,
    arg,
    number,
    noofmsgtoday,
    totalmsg,
    dailylimitover,
    abusepresent,
    groupdata,
    botdata,
    sender,
    stanzaId,
    isMedia,
    reply,
    client,
    isQuotedImage,
    isQuotedVideo,
    isQuotedText,
    quotedMessage,
    groupMetadata,
    groupMembers,
    groupAdmins,
    isGroupAdmins,
    groupName,
    isOwner,
    isSuperAdmin,
    isBotModerator,
    taggedUser,
    isUserTagged
  ) {
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
    this.botNumber = botNumber;
    this.isBotGroupAdmins = isBotGroupAdmins;
    this.isOwner = isOwner;
    this.isSuperAdmin = isSuperAdmin;
    this.isBotModerator = isBotModerator;
    this.isUserTagged = isUserTagged;
    this.taggedUser = taggedUser;
    this.isQuotedSticker = isQuotedSticker;
  }
  mess = mess;

  /**
   * This function is used to send a text message tagging the command.
   * @param {String} input The text message you want to send
   */
  async replytext(input) {
    await this.client.sendMessage(this.from, input, MessageType.text, {
      quoted: this.reply,
      detectLinks: false,
    });
  }

  /**
   * This function is used to send a text message without tagging the command.
   * @param {String} input The text message you want to send
   */
  text(input) {
    this.client.sendMessage(this.from, {
      text: input,
      detectLinks: false,
    });
  }

  /**
   *This function is used to send a sticker message
   * @param {String} path The absolute sticker path
   */
  async replysticker(path) {
    await this.client.sendMessage(this.from, {
      sticker: fs.readFileSync(path),
      quoted: this.reply,
      mimetype: Mimetype.webp,
    });
  }

  /**
   * This function is used to send a image message along with caption if any.
   * @param {String} path The absolute image path.
   * @param {String} caption The caption of the image if any.
   */
  async replyimage(path, caption = "") {
    await this.client.sendMessage(this.from, {
      image: fs.readFileSync(path),
      caption: caption,
      quoted: this.reply,
      detectLinks: false,
    });
    fs.unlinkSync(path);
  }

  /**
   * This function is used to send a video message along with caption if any.
   * @param {String} path The absolute video path
   * @param {String} caption The caption of the video if any
   * @param {String} thumb The absolute thumbnail path if any
   */
  async replyvideo(path, caption, thumb) {
    if (thumb != null) {
      await this.client.sendMessage(
        this.from,
        fs.readFileSync(path),
        MessageType.video,
        {
          quoted: this.reply,
          caption: caption,
          mimetype: Mimetype.mp4,
          detectLinks: false,
          thumbnail: fs.readFileSync(thumb),
        }
      );

      fs.unlinkSync(path);
      fs.unlinkSync(thumb);
    } else {
      await this.client.sendMessage(
        this.from,
        fs.readFileSync(path),
        MessageType.video,
        {
          quoted: this.reply,
          caption: caption,
          mimetype: Mimetype.mp4,
          detectLinks: false,
        }
      );
      fs.unlinkSync(path);
    }
    this.client.sendMessage(this.from, videoMessageDetails);
  }

  errorlog(error) {
    if (process.env.NODE_ENV !== "production") {
      console.log(chalk.red.bold(error));
    } else {
      this.replytext(mess.error.error);
      const e = "🤖 Error log for the tagged message \n\n```" + error + "```";
      this.client.sendMessage(`${process.env.OWNER_NUMBER}@s.whatsapp.net`, {
        text: e,
        quoted: this.reply,
        detectLinks: false,
      });
    }
  }

  noapi() {
    this.replytext(mess.noapi);
  }

  async wrongCommand() {
    let prefix = this.groupdata.prefix;
    if (this.groupdata.prefix == undefined || !this.groupdata.useprefix)
      prefix = "🎀";

    var body =
      "❎ *Error* :\n```syntax error in the given command.```\n\n" +
      "🔖 *Description* :\n" +
      "```" +
      pluginsinfo[this.arg[0]].desc +
      "```\n\n" +
      "📕 *Usage* :\n" +
      prefix +
      "```" +
      pluginsinfo[this.arg[0]].usage +
      "```\n\n" +
      "📚 *Example* :";
    pluginsinfo[this.arg[0]].eg.forEach((currentItem) => {
      body += "\n```" + prefix + currentItem + "```";
    });
    this.replytext(body);
  }
};
