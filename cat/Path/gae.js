const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "gae",
  timeout: 15000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const MEE6 = [
      "u = gae",
      "pLeaSe gAE",
      "REEEEEEEEEEEEEEEEEEEEEE*GAE*EEEEEEEEEEEEEEEEEEEEEEEEEEE",
      "Enough with the gae jokes, U gae",
      "Plain ol' gae",
      "<a:dankcutie:804313489488347146>",
      "By the way, Deity bot is my senpai.\nShe is the most beautiful bot I've ever seen <3",
      "aight imma gae out",
      "*gae with extra steps*",
      "**wae r u gae**",
      "u gae bro?",
      "**100%** gae",
      "I bet you do **tiktok**",
      "**G.A.E.**",
      "The next person to chat is gae",
      "Whoever used C.gae, is **gae**",
      "*Its ok to be gae*",
      "*succ my* **cheez**",
      "**gae gae gae gae gae gae**",
      "**Be gae**",
      "There's no cooldown so y'all get muted for being *gae*",
      "Ok stop using this command, really. U gae?",
      "What the hell, u gae?",
      "**GAEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE**",
    ];
    const MEE6Index = MEE6[Math.floor(Math.random() * MEE6.length)];
    message.delete();
    message.channel.send(`${MEE6Index}`);
  },
};
