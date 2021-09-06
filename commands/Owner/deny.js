const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "deny",
  category: "Owner",
  usage: "(Message)",
  description: "Deny a suggestion",
  Owner: true,
  run: async (client, message, args) => {
    const MessageID = args[0];
    const denyQuery =
      args.slice(1).join(" ") || `They didn't leave any message.`;

    if (!MessageID) return message.reply("Please specify a valid ID");
    try {
      const suggestionChannel = message.guild.channels.cache.get(
        client.SuggestionLog
      );
      const suggestEmbed = await suggestionChannel.messages.fetch(MessageID);
      const data = suggestEmbed.embeds[0];
      const denyEmbed = new MessageEmbed()
        .setAuthor(data.author.name, data.author.iconURL)
        .setDescription(data.description)
        .setColor("RED")
        .addField("**Status(DENIED)**", denyQuery);
      suggestEmbed.edit(denyEmbed);
      const user = await client.users.cache.find(
        u => u.tag === data.author.name
      );
      message.channel.send("Suggestion denied.");
      user.send(denyEmbed);
    } catch (err) {
      message.channel.send("That suggestion doesn't exist");
      console.log(err);
    }
  },
};
