const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "fight",
  description: "Gooooooooooooooooooolag!",
  timeout: 10000,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const Fight = [
      "`Snow Gae`",
      "`Not Gae`",
      "`Ultimate Gae`",
      "`Gae`",
      "`Gae beyond repair`",
      "`Akimbo Gae`",
      "`Mega Gae`",
      "`Super Gae`",
      "`Ultra Gae`",
      "`Terminal Gae`",
      "`Dead`",
      "`Path Gae`",
      "`Cheez Gae`",
      "`Zero Gae`",
      "`KDR Gae`",
      "`! not Gae`",
    ];
    const fightIndex = Fight[Math.floor(Math.random() * Fight.length)];
    message.channel.send(
      `**You have taken a chance at redemption in The Gulag, you fight only to find out that you're ${fightIndex}. If you somehow turned out to not be gae, DM an admin to get unmuted early you lucky bastard!!**`
    );
  },
};
