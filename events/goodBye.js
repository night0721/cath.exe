const { MessageAttachment } = require("discord.js");
const client = require("../bot");
const schema = require("../models/guilds");
const canvas = require("discord-canvas");

client.on("guildMemberAdd", async member => {
  schema.findOne({ Guild: member.guild.id }, async (e, data) => {
    if (!data) return;
    const user = member.user;
    const image = await new canvas.Welcome()
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setMemberCount(member.guild.memberCount)
      .setGuildName(member.guild.name)
      .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
      .setColor("border", client.color)
      .setColor("username-box", client.color)
      .setColor("discriminator-box", client.color)
      .setColor("message-box", client.color)
      .setColor("title", "#89FB23")
      .setColor("avatar", client.color)
      .setBackground(
        "https://cdn.discordapp.com/attachments/815622126526005268/819116213925052436/image0.png"
      )
      .toAttachment();

    const attachment = new MessageAttachment(
      image.toBuffer(),
      "goodbye-image.png"
    );

    const channel = member.guild.channels.cache.get(data.WelcomeChannel);
    if (!channel) return;
    channel.send(attachment);
  });
});

client.on("guildMemberRemove", async member => {
  schema.findOne({ Guild: member.guild.id }, async (e, data) => {
    if (!data) return;
    const user = member.user;
    const image = await new canvas.Goodbye()
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setMemberCount(member.guild.memberCount)
      .setGuildName(member.guild.name)
      .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
      .setColor("border", client.color)
      .setColor("username-box", client.color)
      .setColor("discriminator-box", client.color)
      .setColor("message-box", client.color)
      .setColor("title", "#89FB23")
      .setColor("avatar", client.color)
      .setBackground(
        "https://cdn.discordapp.com/attachments/815622126526005268/819116213925052436/image0.png"
      )
      .toAttachment();

    const attachment = new MessageAttachment(
      image.toBuffer(),
      "goodbye-image.png"
    );

    const channel = member.guild.channels.cache.get(data.GoodbyeChannel);
    if (!channel) return;
    channel.send(attachment);
  });
});
