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
    try {
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
      const limit = await interaction.channel.messages.fetch({
        limit: query.value,
      });
      await channel.bulkDelete(limit, true).then(async m => {
        const results = {};
        for (const [, deleted] of m) {
          const user = `${deleted.author.username}#${deleted.author.discriminator}`;
          if (!results[user]) results[user] = 0;
          results[user]++;
        }
        const userMessageMap = Object.entries(results);
        channel.send({
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
              .addField(
                "Authors",
                `${userMessageMap
                  .map(([user, messages]) => `**${user}** : ${messages}`)
                  .join("\n")}`,
                false
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
      });
    } catch (e) {
      console.log(e);
    }
  },
};
