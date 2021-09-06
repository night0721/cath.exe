const client = require("../bot");
const { MessageEmbed } = require("discord.js");
const { Welcome } = require("../config.json");
client.on("guildMemberAdd", async member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.id === Welcome
  );
  if (!channel) return;
  const embed = new MessageEmbed()
    .setTitle(
      `<:YouTube:841186450497339412> ${member},welcome to Night\'s official Discord server! <:YouTube:841186450497339412>`
    )
    .setThumbnail(member.guild.iconURL({ dynamic: true }))
    .addField(
      "Read the rules at <#799074874513555496> channel, and enjoy your stay~",
      `We now have ${member.guild.memberCount} members!`
    )
    .setFooter(
      `${member.user.tag} joined the server!`,
      member.user.displayAvatarURL({ dynamic: true })
    )
    .setColor(client.color)
    .setTimestamp();

  channel.send({ embeds: [embed] });
});
client.on("guildMemberRemove", async member => {
  const channel = member.guild.channels.cache.find(
    channel => channel.id === Welcome
  );
  if (!channel) return;
  const embed = new MessageEmbed()
    .setTitle(
      `<:YouTube:841186450497339412> ${member} can\'t handle being cool! <:YouTube:841186450497339412>`
    )
    .setThumbnail(member.guild.iconURL({ dynamic: true }))
    .setDescription(`We now only have ${member.guild.memberCount} members`)
    .setFooter(
      `${member.user.tag} leaved the server!`,
      member.user.displayAvatarURL({ dynamic: true })
    )
    .setColor(client.color)
    .setTimestamp();

  channel.send({ embeds: [embed] });
});
