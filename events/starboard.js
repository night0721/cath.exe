const client = require("../bot");
const { MessageEmbed } = require("discord.js");
client.on("messageReactionAdd", async (reaction, user) => {
  const star = async () => {
    const starch = reaction.message.guild.channels.cache.find(
      n => n.name.toLowerCase() === "starboard"
    );
    const msgs = await starch.messages.fetch({ limit: 100 });
    const here = msgs.find(msg =>
      msg.embeds.length === 1
        ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
          ? true
          : false
        : false
    );
    if (here) here.edit(`${reaction.count} - ⭐`);
    else {
      const embed = new MessageEmbed()
        .setColor(client.color)
        .setTitle(
          `From ${reaction.message.author.tag}`,
          reaction.message.author.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(
          reaction.message.author.displayAvatarURL({ dynamic: true })
        )
        .addField(`Message`, `[Jump!](${reaction.message.url})`)
        .setDescription(
          `Content: ${
            reaction.message.content ? reaction.message.content : "None"
          }`
        )
        .setImage(
          reaction.message.attachments.length
            ? reaction.message.attachments.first().url
            : null
        )
        .setFooter(`${reaction.message.id}`)
        .setTimestamp(reaction.message.createdTimestamp);
      if (starch) {
        starch.send({ content: "1 - ⭐", embeds: [embed] });
      }
    }
  };
  if (reaction.emoji.name === "⭐") {
    if (reaction.message.channel.name.toLowerCase() === "starboard") return;
    if (reaction.message.partial) {
      await reaction.fetch();
      await reaction.message.fetch();
      star();
    } else star();
  }
});
client.on("messageReactionRemove", async (reaction, user) => {
  const star = async () => {
    const starch = reaction.message.guild.channels.cache.find(
      n => n.name.toLowerCase() === "starboard"
    );
    const msgs = await starch.messages.fetch({ limit: 100 });
    const here = msgs.find(msg =>
      msg.embeds.length === 1
        ? msg.embeds[0].footer.text.startsWith(reaction.message.id)
          ? true
          : false
        : false
    );
    if (here) {
      if (reaction.count === 0) {
        setTimeout(function () {
          here.delete();
        }, 5000);
      } else here.edit(`${reaction.count} - ⭐`);
    }
  };
  if (reaction.emoji.name === "⭐") {
    if (reaction.message.channel.name.toLowerCase() === "starboard") return;
    if (reaction.message.partial) {
      await reaction.fetch();
      await reaction.message.fetch();
      star();
    } else star();
  }
});
