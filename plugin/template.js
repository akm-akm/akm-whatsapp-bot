/**
 * Import all the packages your plugin needs to work.
 */

module.exports = {
  /**
   * Enter the command name here that you want to see in the help menu.
   */
  name: "template",

  /**
   * If your command takes multiple arguments then show here on how to use it.
   */
  usage: "template <arguments>",

  /**
   * Give a detailed description on what this pulgin does and how to use.
   */
  desc: "Detailed description here.",

  /**
   * Show few examples on how to use the plugin in the format given below.
   */
  eg: ["template input 1", "template ok", "template input 3"],

  /**
   * If your plugin runs only in a group and not in inbox then write true here.
   */
  group: false,

  /**
   * If this plugin can only be used by the owner of the bot then write true here. This should be false in most cases.
   */
  owner: false,

  /**
   * This function handles the working of the plugin. Do not change the name of the function.
   * @param {Constructor} Bot It contains all the details of the message that called this function.
   */
  async handle(Bot) {
    try {
      /**
       * Suppose someone messages this to the bot - "   Hey bot       hoW  ARe you? See THIS https://GOOGLE.COM  🤦‍♀️"
       * Then the bot will clean this string and store it in an array like this - ["hey","bot","how","are","you?","see","this","https://GOOGLE.COM","🤦‍♀️"]
       * it converts all the test except links to small case.
       */
      const arg = Bot.arg;

      Bot.replytext(
        "This function only takes text as input and replies to the user who called this."
      );
      /**
       * To see other message types, see this file - /utils/Bot.js
       */
      // your code here
    } catch (error) {
      Bot.errorlog(error);
    }
  }
};
