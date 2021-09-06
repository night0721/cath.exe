const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "info",
  Owner: true,
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setAuthor(
        "Cath Nation Role Informatiom",
        message.guild.iconURL({ dynamic: true, size: 4096 })
      )
      .setColor(client.color)
      .addFields(
        {
          name: "<@&840539971068755989>",
          value: "The Server Owner",
          inline: false,
        },
        {
          name: "<@&827182913002012694>",
          value: "🤐",
          inline: true,
        },
        {
          name: "<@&765928569397575750>",
          value: "The unpingable ones",
          inline: true,
        },
        {
          name: "<@&854306717977935882>",
          value: "The Server Owner's Bots",
          inline: true,
        },
        {
          name: "<@&832145795523280907>",
          value: "The unpingable ones",
          inline: true,
        },
        {
          name: "<@&756805977298305135>",
          value: "The ones who can control the server",
          inline: true,
        },
        {
          name: "<@&840537065984491531>",
          value: "Premium users of Cath",
          inline: true,
        },
        {
          name: "<@&856223068782723093>",
          value: "The developers and the helpers of Cath",
          inline: true,
        },
        {
          name: "<@&836279963069710336>",
          value: "VIPs of this server. Chosen by the server owner",
          inline: true,
        },
        {
          name: "<@&807976942066204674>",
          value: "Partner of Cath or the server",
          inline: true,
        },
        {
          name: "<@&828273514497835059>",
          value: "The wealthy ones",
          inline: true,
        },
        {
          name: "<@&756805886244028427>",
          value: "Old VIPs",
          inline: true,
        },
        {
          name: "<@&749676662098100235>",
          value: "Maybe useful for the server",
          inline: true,
        },
        {
          name: "<@&840536973126270976>",
          value: "Platium camo color",
          inline: true,
        },
        {
          name: "<@&841200768706543636>",
          value: "Gold camo color",
          inline: true,
        },
        {
          name: "<@&841026716181069824>",
          value: "Receive announcements",
          inline: true,
        },
        {
          name: "<@&841200845885538325>",
          value: "Recevie updates for Cath(s)",
          inline: true,
        },
        {
          name: "<@&841026772790673448>",
          value: "Recevie updates for Night's YouTube",
          inline: true,
        },
        {
          name: "<@&840926118617809006>",
          value: "People who are bad",
          inline: true,
        }
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setURL(client.web)
      .setFooter(
        "Ń1ght#0001",
        message.author.displayAvatarURL({ dynamic: true, size: 4096 })
      )
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  },
};
