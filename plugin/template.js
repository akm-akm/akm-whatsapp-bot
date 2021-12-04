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
  eg: ["template btc", "template xrp", "template eth"],

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
    const arg = Bot.arg;

    // your code here
  },
};



/** 
 * What are the details and methods in Bot constructor?
 * 
 */
