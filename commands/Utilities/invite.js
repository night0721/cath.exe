const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["support", "bot", "server"],
  description: "Get bot invite link",
  category: "Utilities",
  run: async (client, message, args) => {
    var embed = new MessageEmbed()
      .setFooter(`Made by ${client.author}`)
      .setColor(client.color)
      .setTimestamp()
      .setAuthor(message.author.tag, message.author.displayAvatarURL)
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
        "**You can either boost support server or gift a nitro to one of the Developer of Cath Team to be premium user**"
      );
    message.inlineReply(embed);
  },
};
