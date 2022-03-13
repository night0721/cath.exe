const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "avatar",
  description: "Show user's avatar in different formats",
  type: "CHAT_INPUT",
  usage: "{User}",
  category: "Information",
  options: [
    {
      type: 6,
      name: "user",
      description: "The user you want to see",
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const member =
      interaction.guild.members.cache.get(args[0]) || interaction.member;
    const embed = new MessageEmbed()
      .setAuthor({
        text: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true, size: 1024 }),
      })
      .setColor(client.color)
      .setTitle(`${member.user.username}'s Avatar`)
      .setDescription(
        `\`Links:\` **[png](${member.user.displayAvatarURL({
          format: "png",
          size: 2048,
        })}) | [jpg](${member.user.displayAvatarURL({
          format: "jpg",
          size: 2048,
        })}) | [webp](${member.user.displayAvatarURL({
          format: "webp",
          size: 2048,
        })}) | [gif](${member.user.displayAvatarURL({
          format: "gif",
          size: 2048,
        })})**`
      )
      .setImage(
        member.user.avatarURL({ size: 2048, dynamic: true, format: "png" })
      )
      .setFooter({
        text: `Made by ${client.author}`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setURL(client.web)
      .setTimestamp();
    interaction.followUp({ embeds: [embed] });
  },
};
