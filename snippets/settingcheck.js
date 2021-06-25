const fs = require("fs");
const path = require("path");
const abuse = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/abuse.json"))
);
const blocked = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/blocked.json"))
);
const groupsetting = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/groupsetting.json"))
);
const noofmessage = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/limit.json"))
);
const settings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/settings.json"))
);
x = abuse.abuse;

function settingread(arg, from, sender) {
  function isabuse(aarg) {
    return x.forEach((element) => {
      if (aarg.includes(element)) return 1;
    });
  }

  if (from.endsWith("@g.us") && groupsetting[from] == undefined) {
    fs.readFile(
      path.join(__dirname, "../data/groupsetting.json"),
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          obj = JSON.parse(data);
          obj[from] = {
            prefix: "x",
            allowabuse: 1,
            whocanusebot: 1,
            autosticker: 0,
            stickergroup: 1,
            marketgroup: 0,
            isnewgroup: 1,
          };
          fs.writeFile(
            path.join(__dirname, "../data/groupsetting.json"),
            JSON.stringify(obj, null, "\t"),
            "utf8",
            () => {}
          );
        }
      }
    );

    return 0;
  }

  from.endsWith("@g.us")
    ? (number = sender.split("@")[0])
    : (number = from.split("@")[0]);

  if (noofmessage[number] == undefined) {
    fs.readFile(
      path.join(__dirname, "../data/limit.json"),
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          obj = JSON.parse(data);
          obj[number] = 0;

          fs.writeFile(
            path.join(__dirname, "../data/limit.json"),
            JSON.stringify(obj, null, "\t"),
            "utf8",
            () => {}
          );
        }
      }
    );
  }
  return (data = {
    arg: from.endsWith("@g.us")
      ? arg
          .replace(/\s+/g, " ")
          .toLowerCase()
          .split(" ")[0]
          .startsWith(groupsetting[from].prefix)
        ? (arg = arg.slice(1).replace(/\s+/g, " ").toLowerCase().split(" "))
        : 0
      : arg
          .replace(/\s+/g, " ")
          .toLowerCase()
          .split(" ")[0]
          .startsWith(settings.prefix)
      ? (arg = arg.slice(1).replace(/\s+/g, " ").toLowerCase().split(" "))
      : 0,
    noofmsgtoday: noofmessage[number],
    abusepresent: isabuse(arg),
    isnumberblocked: blocked.blocked.includes(number) ? 1 : 0,
    groupdata: groupsetting[from] || 0,
  });
}
function settingwrite(from) {}
module.exports.settingread = settingread;