const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "report",
  description: "Report a bug of the bot",
  category: "Utilities",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "bug",
      description: "The bug you want to report",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    const bug = args[0];
    interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setTitle("SUCCESS!")
          .setDescription(
            "You have reported a bug.\nPlease wait for us to solve it"
          )
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setTimestamp()
          .setColor("GREEN"),
      ],
    });
    const ch = client.channels.cache.get(client.config.Report);
    ch.send({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            interaction.user.tag,
            interaction.user.displayAvatarURL({ dynamic: true })
          )
          .setTitle("New Bug")
          .setDescription(bug)
          .setColor("ORANGE")
          .setTimestamp(),
      ],
    });
  },
};
