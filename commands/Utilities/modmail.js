const schema = require("../../models/modmail");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "modmail",
  BotPerm: "MANAGE_CHANNELS",
  description: "Create a modmail thread with moderators in a server",
  usage: "(Emoji) (Text)",
  category: "Utilities",
  run: async (client, message, args) => {
    const data = await schema.findOne({ Guild: message.guild.id });
    if (
      !data ||
      !data.Role ||
      !data.Category ||
      !data.Choices ||
      !Object.entries(data.Choices).length ||
      !message.guild.roles.cache.has(data.Role) ||
      !message.guild.channels.cache.find(
        value => value.type == "category" && value.id === data.Category
      )
    )
      return message.channel.send(
        `This server isn't setup properly. Please find an administrator or a moderator to specify a category, role and choices for users to create thread. The issue may be caused by invalid role/category.`
      );
    const embed = new MessageEmbed();
    const choices = Object.entries(data.Choices);
    embed.setDescription(
      choices.map(value => `${value[1].emoji} - ${value[1].text}`).join("\n")
    );
    try {
      const msg = await message.author.send(embed);
      choices.map(async value => {
        await msg.react(value[1].emoji);
      });
      const reactionCollector = await msg.createReactionCollector(
        async (reaction, user) =>
          choices.map(value => value[1].emoji).includes(reaction.emoji.name) &&
          user.id == message.author.id,
        { time: 30000 }
      );
      let type;
      reactionCollector.on("collect", async reaction => {
        type = choices.find(value => value[1].emoji == reaction.emoji.name);
        await msg.delete();
        reactionCollector.stop("done");
      });
      reactionCollector.on("end", async (collected, reason) => {
        if (reason.toLowerCase() == "time") {
          return (
            message.channel.send(
              "You didn't provide a reaction in-time. Cancelled."
            ),
            message.author.send(
              "You didn't provide a reaction in-time. Cancelled"
            )
          );
        } else {
          const channel = await message.guild.channels.create(
            `${message.author.username}-${message.author.discriminator}`,
            {
              reason: "Modmail thread",
              parent: data.Category,
              topic: `${type[1].text}`,
              type: "text",
            }
          );
          const transcript = [];
          channel.createOverwrite(data.Role, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
          });
          channel.createOverwrite(message.guild.id, {
            VIEW_CHANNEL: false,
          });
          channel.send(
            `A modmail thread has been started by ${message.author.tag} with type: ${type[1].text}\nUse \`close\` to close the thread.`
          );
          message.author.send(
            "Thread created. Use `close` to close the thread."
          );
          const channelCollector = channel.createMessageCollector(
            m => !m.author.bot
          );
          const dmCollector = message.author.dmChannel.createMessageCollector(
            m => !m.author.bot
          );
          channelCollector.on("collect", async m => {
            if (m.content.toLowerCase().startsWith("close")) {
              message.author.send("Closing..");
              channel.send("Closing..");
              dmCollector.stop("done");
              channelCollector.stop("done");
              fs.writeFileSync(
                `./transcript.${message.author.id}.txt`,
                transcript.join("\n")
              );
              const attachment = new MessageAttachment(
                fs.createReadStream(`./transcript.${message.author.id}.txt`)
              );
              await channel.send(attachment);
              fs.unlinkSync(`./transcript.${message.author.id}.txt`);
              setTimeout(() => {
                channel.delete();
              }, 1000 * 10);
            }
            message.author.send(`**Admin**: ${m.content}`);
            transcript.push(`**Admin**: ${m.content}`);
          });
          dmCollector.on("collect", async m => {
            if (m.content.toLowerCase().startsWith("close")) {
              message.author.send("Closing..");
              channel.send("Closing..");
              dmCollector.stop("done");
              channelCollector.stop("done");
              fs.writeFileSync(
                `./transcript.${message.author.id}.txt`,
                transcript.join("\n")
              );
              const attachment = new MessageAttachment(
                fs.createReadStream(`./transcript.${message.author.id}.txt`)
              );
              await channel.send(attachment);
              fs.unlinkSync(`./transcript.${message.author.id}.txt`);
              setTimeout(() => {
                channel.delete();
              }, 1000 * 10);
            }
            channel.send(`**${message.author.tag}**: ${m.content}`);
            transcript.push(`**${message.author.tag}**: ${m.content}`);
          });
        }
      });
    } catch {
      return message.inlineReply("please let me send DM to you.");
    }
  },
};
