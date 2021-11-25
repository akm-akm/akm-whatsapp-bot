const request = require("request");
const fs = require("fs");
const path = require("path");
const languagecode = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/languages.json"))
);

module.exports = {
  name: "run",
  usage: "run <language> <inputs>",
  desc: "Compiles and runs the tagged code in any programming language and sends the output here. Supported language codes are - c, csharp, cpp, python3, python2, java, nodejs, kotlin, php, perl, ruby, go, rust, fortran, swift and many more. If the program takes input, it must be added after the language code seperated by spaces. In the example below it shows cpp 30 50, here 30 and 50 are two inputs. similarly in java 20 here 20 is the input. If your code does not require any input it should be left blank. After writing the code tag that code with this run command follwed by language code and inputs if required. The code should be pure as if it is written in any IDE.",
  eg: [
    "run cpp",
    "run cpp 30 50",
    "run python3",
    "run java 20",
    "run nodejs",
    "run php",
    "run python2",
  ],
  group: false,
  owner: false,
  handle(Bot) {
    const arg = Bot.arg;

    if (arg.length === 1) {
      Bot.wrongCommand();
      return;
    }
    if (!Bot.isQuotedText) {
      Bot.wrongCommand();

      return;
    }
    if (!process.env.clientId && !process.env.clientSecret) {
      Bot.noapi();
      return;
    }
    if (!languagecode.includes(arg[1])) {
      Bot.wrongCommand();
      return;
    }
    try {
      const program = {
        script: Bot.quotedMessage,
        language: arg[1],
        versionIndex: "0",
        stdin: arg.slice(2).join(" "),
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
      };
      request(
        {
          url: "https://api.jdoodle.com/v1/execute",
          method: "POST",
          json: program,
        },
        function (_error, _response, body) {
          Bot.replytext(
            "🧮 > " + arg[1] + "\n\n" + "```" + body.output + "```"
          );
        }
      );
    } catch (error) {
      Bot.errorlog(error);
    }
  },
};
