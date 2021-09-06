const { Collection, MessageEmbed } = require("discord.js");
module.exports = {
  name: "rich",
  description: "Displaying top 10 richest users.",
  category: "Economy",
  run: async (client, interaction, args) => {
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
    if (!collection)
      return await interaction.followUp({
        content: `None of the members got ${client.currency}!`,
      });
    const ata = collection.sort((a, b) => b.bal - a.bal).first(10);
    await interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setTitle(`Richest users in ${interaction.guild.name}`)
          .setDescription(
            ata
              .map((v, i) => {
                return `${i + 1}: ${
                  interaction.guild.members.cache.get(v.id).user.tag
                } => **${v.bal}${client.currency}**`;
              })
              .join("\n")
          )
          .setFooter(`Made by ${client.author}`)
          .setTimestamp()
          .setColor(client.color),
      ],
    });
  },
};
