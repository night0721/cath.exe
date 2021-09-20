const { MessageEmbed } = require("discord.js");
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
      .setDescription(
        "<@&840539971068755989>\nThe Server Owner\n<@&765928569397575750>\nThe unpingable ones\n<@&854306717977935882>\nThe Server Owner's Bots\n<@&832145795523280907>\nThe unpingable ones\n<@&756805977298305135>\nThe ones who can control the server\n<@&840537065984491531>\nPremium users of Cath\n<@&856223068782723093>\nThe developers and the helpers of Cath\n<@&836279963069710336>\nVIPs of this server. Chosen by the server owner\n<@&807976942066204674>\nPartner of Cath or the server\n<@&828273514497835059>\nThe wealthy ones\n<@&756805886244028427>\nOld VIPs\n<@&749676662098100235>\nMaybe useful for the server\n<@&840536973126270976>\nPlatium camo color\n<@&841200768706543636>\nGold camo color\n<@&841026716181069824>\nReceive announcements\n<@&841200845885538325>\nRecevie updates for Cath(s)\n<@&841026772790673448>\nRecevie updates for Night's YouTube\n<@&840926118617809006>\nPeople who are bad"
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
