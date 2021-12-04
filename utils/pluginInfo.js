const path = require("path");
const fs = require("fs");
let pluginsinfo = [];
const plugins = fs.readdirSync(path.join(__dirname, "../plugin"));
for (let file of plugins) {
  try {
    const command = require(path.join(__dirname, "../plugin/", `${file}`));
    if (
      command.name &&
      command.usage &&
      command.desc &&
      typeof command.handle === "function" &&
      command.eg &&
      typeof command.group === "boolean" &&
      typeof command.owner === "boolean"
    ) {
      temp = {
        desc: command.desc,
        usage: command.usage,
        eg: command.eg,
      };
      pluginsinfo[command.name] = temp;
    }
  } catch (error) {}
}
const builtInPlugin = fs
  .readdirSync(path.join(__dirname, "../builtInPlugins"))
  .filter((file) => file != "help.js");
for (let file of builtInPlugin) {
  const command = require(path.join(
    __dirname,
    "../builtInPlugins/",
    `${file}`
  ));
  if (
    command.name &&
    command.usage &&
    command.desc &&
    typeof command.handle === "function" &&
    command.eg &&
    typeof command.group === "boolean" &&
    typeof command.owner === "boolean"
  ) {
    temp = {
      desc: command.desc,
      usage: command.usage,
      eg: command.eg,
    };
    pluginsinfo[command.name] = temp;
  }
}
module.exports = pluginsinfo;
