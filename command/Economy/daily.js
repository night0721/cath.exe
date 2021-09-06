const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "daily",
  description: "Earns daily money",
  category: "Economy",
  timeout: 1000 * 60 * 60 * 24,
  run: async (client, interaction, args) => {
    var money;
    const user = await client.data.getUser(interaction.user.id);
    if (user) {
      if (user.Premium == true) {
        money = 20000;
        let pre_embed = new MessageEmbed()
          .setAuthor(
            interaction.member.user.tag,
            interaction.user.displayAvatarURL({ dyanmic: true })
          )
          .setDescription(
            `**Here is your daily ${money}${client.currency}!\nThanks for supporting Cath!**`
          )
          .setURL(client.web)
          .setColor(client.color)
          .setFooter(`Made by ${client.author}`)
          .setTimestamp();
        await client.add(interaction.user.id, money, interaction);
        return await interaction.followUp({ embeds: [pre_embed] });
      } else {
        money = 10000;
        let norm_embed = new MessageEmbed()
          .setAuthor(
            interaction.member.user.tag,
            interaction.user.displayAvatarURL({ dyanmic: true })
          )
          .setDescription(
            `Here is your daily ${money}${client.currency}!\nBe [premium](https://discord.gg/SbQHChmGcp) user, you can get more coins everyday!`
          )
          .setURL(client.web)
          .setColor(client.color)
          .setFooter(`Made by ${client.author}`)
          .setTimestamp();
        await client.add(interaction.user.id, money, interaction);
        return await interaction.followUp({ embeds: [norm_embed] });
      }
    }
  },
};
