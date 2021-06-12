const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "test",
  Owner: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setAuthor(
        "Ń1ght and Cath Nation",
        "https://images-ext-2.discordapp.net/external/JyjN4pXpaLIaSOSszAR9dyp03Hf3ouzjUb8kRa0OFiE/%3Fsize%3D2048/https/cdn.discordapp.com/icons/718762019586572341/c35c387563c7527f056276f2a16f526b.webp"
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
          value: "<@&765928569397575750>",
          inline: true,
        }
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setURL(client.web)
      .setFooter(
        "Ń1ght#0001",
        "https://images-ext-2.discordapp.net/external/JyjN4pXpaLIaSOSszAR9dyp03Hf3ouzjUb8kRa0OFiE/%3Fsize%3D2048/https/cdn.discordapp.com/icons/718762019586572341/c35c387563c7527f056276f2a16f526b.webp"
      )
      .setTimestamp();
    message.channel.send(embed);
  },
};
