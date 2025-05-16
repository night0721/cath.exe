const { EmbedBuilder, version: djsversion } = require("discord.js");
const version = require("../../package.json").version;
module.exports = {
  name: "botinfo",
  description: "Check the info of the bot",
  category: "Information",
  run: async (client, interaction, args, utils) => {
    const embed = new EmbedBuilder()
      .setTitle(`NYX - CODM Gunsmith Bot`)
      .setURL(utils.inviteLink(client.user.id))
      .setThumbnail(
        "https://media.discordapp.net/attachments/896078559293104128/896392631565828146/nyx_logo_transparent.webp"
      )
      .setColor(client.color)
      .addFields([
        {
          name: `General`,
          value: `
        <:nyx_owner:897418259433943120> Owner ❯ <@452076196419600394> 
        Bot ❯ ${client.user.tag}
        Bot ID ❯ \`${client.user.id}\`
        Created on ❯ \`${utils.botDate(
          new Date(client.user.createdTimestamp)
        )}\``,
          inline: true,
        },
        {
          name: `Bot Stats`,
          value: `
          Servers ❯ ${client.guilds.cache.size.toLocaleString()} 
          Users ❯ ${client.guilds.cache
            .reduce((a, b) => a + b.memberCount, 0)
            .toLocaleString()}
          Channels ❯ \`${client.channels.cache.size.toLocaleString()}\`
          Commands ❯ \`${client.slashCommands.size}\`
          `,
          inline: true,
        },
        {
          name: `Platform`,
          value: `
            NYX ❯ \`v${version}\`
            Discord.js ❯ \`v${djsversion}\`
            Node.js ❯ \`${process.version}\``,
        },
        {
          name: `**${client.author}**`,
          value: `**Development Management**\n\u3000Ń1ght#0001\n\u3000Cat drinking a cat#0795\n\u3000mightyful#6536\n\u3000Thunder#2128\n\u3000mobo#9277\n
          **Research & Documentation**\n\u3000Thunder#2128\n
          **Website**\n\u3000Chunchunmaru#8570`,
        },
      ])
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
