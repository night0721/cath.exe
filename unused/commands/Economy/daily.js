const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "daily",
  description: "Earns daily money",
  category: "Economy",
  timeout: 1000 * 60 * 60 * 24,
  run: async (client, interaction, args) => {
    let money;
    const user = await client.data.getUser(interaction.user.id);
    if (user) {
      if (user.Premium == true) {
        money = 20000;
        const pre_embed = new MessageEmbed()
          .setTitle(`${user.username}'s profile`)
          .setDescription(
            `Here is your daily **${money}** ${client.currency}\nYou can use this again in 24hrs`
          )
          .setURL(client.web)
          .setColor(client.color)
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setTimestamp();
        await client.add(interaction.user.id, money, interaction);
        return interaction.followUp({ embeds: [pre_embed] });
      } else {
        money = 10000;
        const norm_embed = new MessageEmbed()
          .setAuthor(
            interaction.user.tag,
            interaction.user.displayAvatarURL({ dyanmic: true })
          )
          .setDescription(
            `Here is your daily ${money}${client.currency}!\nBe [premium](https://discord.gg/SbQHChmGcp) user, you can get more coins everyday!`
          )
          .setURL(client.web)
          .setColor(client.color)
          .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
          .setTimestamp();
        await client.add(interaction.user.id, money, interaction);
        return interaction.followUp({ embeds: [norm_embed] });
      }
    }
  },
};
