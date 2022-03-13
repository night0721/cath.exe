const { MessageEmbed, version: djsversion } = require("discord.js");
const version = require("../../../package.json").version;
const { utc } = require("moment");
module.exports = {
  name: "botinfo",
  description: "Check the info of the bot",
  category: "Information",
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setTitle(`NYX - CODM Gunsmith Bot`)
      .setURL(
        `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=4231314550&scope=bot%20applications.commands`
      )
      .setThumbnail(
        "https://media.discordapp.net/attachments/896078559293104128/896392631565828146/nyx_logo_transparent.webp"
      )
      .setColor(client.color)
      .addFields(
        {
          name: `General`,
          value: `
        <:nyx_owner:897418259433943120> Owner ❯ <@452076196419600394> 
        Bot ❯ ${client.user.tag}
        Bot ID ❯ \`${client.user.id}\`
        Created on ❯ \`${utc(client.user.createdTimestamp).format(
          "MMMM Do YYYY"
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
          Commands ❯ \`${client.commands.size}\`
          `,
          inline: true,
        }
      )
      .addFields({
        name: `Platform`,
        value: `
          NYX ❯ \`v${version}\`
          Discord.js ❯ \`v${djsversion}\`
          Node.js ❯ \`${process.version}\``,
      })
      .addFields({
        name: `**${client.author}**`,
        value: `**Development Management**\n\u3000Ń1ght#0001\n\u3000Cat drinking a cat#0795\n\u3000mightyful#6536\n\u3000Thunder#2128\n\u3000mobo#9277\n
        **Research & Documentation**\n\u3000𝔔𝓻𝔦ค𝔁𝔖ค𝔦ӄø#0690\n\u3000Thunder#2128\n
        **Website**\n\u3000Chunchunmaru#8570`,
      })
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
