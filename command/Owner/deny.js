const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "deny",
  category: "Owner",
  usage: "(Message)",
  description: "Deny a suggestion",
  Owner: true,
  options: [
    {
      type: 3,
      name: "messageid",
      description: "The message ID to deny",
      required: true,
    },
    {
      type: 3,
      name: "query",
      description: "The deny query",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const MessageID = args[0];
    const denyQuery = args[1] || `They didn't leave any message.`;
    try {
      const suggestionChannel = interaction.guild.channels.cache.get(
        client.config.Report
      );
      const suggestEmbed = await suggestionChannel.messages.fetch(MessageID);
      const data = suggestEmbed.embeds[0];
      const denyEmbed = new EmbedBuilder()
        .setAuthor(data.author.name, data.author.iconURL)
        .setDescription(data.description)
        .setColor("RED")
        .addField("**Status(DENIED)**", denyQuery);
      suggestEmbed.edit({ embeds: [denyEmbed] });
      const user = await client.users.cache.find(
        u => u.tag === data.author.name
      );
      interaction.followUp({
        content: "<a:nyx_cross:897244999211696198> Suggestion Denied",
      });
      user.send({ embeds: [denyEmbed] });
    } catch (e) {
      interaction.followUp({ content: "That suggestion doesn't exist" });
      console.log(e);
    }
  },
};
