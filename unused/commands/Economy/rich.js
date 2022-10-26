const { Collection, EmbedBuilder } = require("discord.js");
module.exports = {
  name: "rich",
  description: "Displaying top 10 richest users.",
  category: "Economy",
  timeout: 4000,
  run: async (client, interaction) => {
    const collection = new Collection();
    await Promise.all(
      interaction.guild.members.cache.map(async member => {
        const id = member.id;
        const bal = await client.bal(id);
        if (!bal) return;
        return bal !== 0
          ? collection.set(id, {
              id,
              bal,
            })
          : null;
      })
    );
    if (!collection) {
      return interaction.followUp({
        content: `None of the members got ${client.currency}!`,
      });
    }
    const ata = collection.sort((a, b) => b.bal - a.bal).first(10);
    interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Richest users in ${interaction.guild.name}`)
          .setDescription(
            ata
              .map((v, i) => {
                return `**${i + 1}❯** ${
                  interaction.guild.members.cache.get(v.id).user.tag
                } =❯ **${v.bal} ${client.currency}**`;
              })
              .join("\n")
          )
          .setFooter({
            text: `Made by ${client.author}`,
            iconURL: client.user.displayAvatarURL(),
          })
          .setTimestamp()
          .setColor(client.color),
      ],
    });
  },
};
