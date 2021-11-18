const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "accept",
  category: "Owner",
  usage: "(Message)",
  description: "Accept a suggestion",
  Owner: true,
  options: [
    {
      type: 3,
      name: "messageid",
      description: "The message ID to accept",
      required: true,
    },
    {
      type: 3,
      name: "query",
      description: "The accept query",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const MessageID = args[0];
    const acceptQuery =
      args.slice(1).join(" ") || `They didn't leave any message.`;
    try {
      const suggestionChannel = interaction.guild.channels.cache.get(
        client.config.Report
      );
      const suggestEmbed = await suggestionChannel.messages.fetch(MessageID);
      const data = suggestEmbed.embeds[0];
      const acceptEmbed = new MessageEmbed()
        .setAuthor(data.author.name, data.author.iconURL)
        .setDescription(data.description)
        .setColor("GREEN")
        .addField("**Status(ACCEPTED)**", acceptQuery);
      suggestEmbed.edit({ embeds: [acceptEmbed] });
      const user = await client.users.cache.find(
        u => u.tag === data.author.name
      );
      interaction.followUp({
        content: "<a:nyx_checkmark:897240322411724841> Suggestion Accepted",
      });
      user.send({ embeds: [acceptEmbed] });
    } catch (e) {
      interaction.followUp({ content: "That suggestion doesn't exist" });
      console.log(e);
    }
  },
};
