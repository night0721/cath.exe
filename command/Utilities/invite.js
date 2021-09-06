const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get bot invite link or get support",
  category: "Utilities",
  type: "CHAT_INPUT",
  run: async (client, interaction, args) => {
    var embed = new MessageEmbed()
      .setFooter(`Made by ${client.author}`)
      .setColor(client.color)
      .setTimestamp()
      .setAuthor(
        interaction.member.user.tag,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle(`Support/Invite`)
      .addField(
        "**Invite Link**",
        `**Invite me to your server by clicking [here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=4231314550&scope=bot%20applications.commands)**`
      )
      .addField(
        "**Support Server Invite**",
        "**Join the support server by clicking [here](https://discord.gg/SbQHChmGcp)**"
      )
      .addField(
        "**Premium**",
        "**You can either boost support server or subscribe to developer's team [Ko-fi](https://ko-fi.com/cathteam) or gift a nitro to one of the developer team **"
      );
    await interaction.followUp({ embeds: [embed] });
  },
};
