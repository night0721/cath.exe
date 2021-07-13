const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "edit",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setAuthor(
        "Ń1ght and Cath Nation",
        message.guild.iconURL({ dynamic: true, size: 4096 })
      )
      .setColor(client.color)
      .setDescription(
        "*Welcome to Ń1ght and Cath Nation*.\n**Please get a role below by reacting!**\n**[Invite](https://discord.com/api/oauth2/authorize?client_id=800966959268364288&permissions=4231314550&scope=bot%20applications.commands) | [Support](https://discord.gg/SbQHChmGcp) | [YouTube](https://youtube.com/c/Kirito01) | [Website](https://www.cath.gq)**"
      )
      .addFields(
        {
          name: "Gold<:gold:841194046419370024>",
          value: "<@&841200768706543636>",
          inline: true,
        },
        {
          name: "Platinum<:platinum:841194040165924865>",
          value: "<@&840536973126270976>",
          inline: true,
        },
        {
          name: "Updates<:Update:841196992385253408>",
          value: "<@&841200845885538325>",
          inline: true,
        },
        {
          name: "Announcements<:announce_dark:841195615458951168>",
          value: "<@&841026716181069824>",
          inline: false,
        },
        {
          name: "YouTube<:YouTube:841186450497339412>",
          value: "<@&841026772790673448>",
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
    const ch = message.guild.channels.cache.get(message.channel.id);
    const msgs = await ch.messages.fetch(args[0]);
    msgs.edit("", embed);
  },
};
