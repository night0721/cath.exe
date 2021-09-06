const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Clear messages in a specific channel",
  options: [
    {
      name: "channel",
      description: "Channel where the messages to be deleted",
      type: "CHANNEL",
      required: true,
    },
    {
      name: "amount",
      description: "Amount of message in range of 1-100 to be deleted",
      type: "NUMBER",
      required: true,
    },
  ],
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    let query = interaction.options.get("amount");
    let ch = interaction.options.get("channel");
    let channel = interaction.guild.channels.cache.get(ch.value);
    if (query.value > 100) {
      return interaction.followUp({
        content: "The amount of messages must be in range of 1-100",
      });
    }
    if (channel.type !== "GUILD_TEXT") {
      return interaction.followUp({
        content: "Please provide a text channel instead of voice or category",
      });
    }
    await channel.bulkDelete(query.value, true).then(async m => {
      const msg = await channel.send({
        embeds: [
          new MessageEmbed()
            .setTitle(`Message Cleared`)
            .addField(
              "**Moderator**",
              `${
                interaction.member.nickname
                  ? interaction.member.nickname
                  : interaction.user.username
              }`,
              true
            )
            .addField(
              "Amount of Message Deleted",
              `${m.size}/${query.value}`,
              true
            )
            .setTimestamp()
            .setFooter(
              interaction.member.nickname
                ? interaction.member.nickname
                : interaction.user.username,
              interaction.user.displayAvatarURL({ dynamic: true })
            )
            .setColor(client.color),
        ],
      });
      setTimeout(() => msg.delete(), 10000);
    });
  },
};
