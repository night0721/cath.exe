const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "premiumserveradd",
  category: "Config",
  timeout: 1000 * 60,
  aliases: ["psadd", "psa", "premiumserver"],
  description: "Add premium to a server",
  Premium: true,
  run: async (client, message, args) => {
    try {
      const user = await client.data.getUser(message.author.id);
      const guild = await client.data.getGuild(message.guild.id);
      if (guild.Premium == true) {
        return client.err(message, "Config", "premium", 506);
      }
      if (
        (user.Tier == 1 && user.PremiumServers.length >= 5) ||
        (user.Tier == 2 && user.PremiumServers.length >= 2) ||
        (user.Tier == 3 && user.PremiumServers.length >= 0)
      ) {
        return client.err(message, "Config", "premium", 505);
      }
      await client.data.setPremium(message.guild.id, "true");
      await client.data.pushGuild(message.author.id, message.guild.id, "push");
      message.channel.send(
        new MessageEmbed()
          .setTitle("Success!")
          .setDescription(`Premium added to **${message.guild.name}**! \n`)
          .setFooter("Thank you for supporting Cath!")
          .setColor("GREEN")
          .setTimestamp()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          )
      );
      client.ServerLog.send(
        new MessageEmbed()
          .setTitle("New Premium Server")
          .addField("Server Info", [
            `**>Server Name**: \n${message.guild.name}`,
            `**>Server ID**: \n${message.guild.id}`,
            `**>Server Member Count**: \n${message.guild.memberCount}`,
          ])
          .addField("Owner Info", [
            `**>Owner Tag**: \n${message.guild.owner.user.tag}`,
            `**>Owner ID**: \n${message.guild.owner.id}`,
          ])
          .setTimestamp()
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setColor("GREEN")
      );
    } catch (e) {
      console.log(e);
      return client.err(message, "Config", "premium", 999);
    }
  },
};
