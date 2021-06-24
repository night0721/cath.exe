const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "fantastic",
  timeout: 60000,

  run: async (client, message, args) => {
    message.delete();
    const player = args.join(" ");
    message.channel.send(
      `${player} is a fantastic CoDM player. Just need to work on communication, map awareness, info scouting, bomb plants, positioning, teamfighting, gun skill , utility usage, rotations and getting kills.`
    );
  },
};
