const schema = require("../../models/modmail");
const { EmbedBuilder, MessageAttachment } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "modmail",
  BotPerm: "MANAGE_CHANNELS",
  description: "Create a modmail thread with moderators in a server",
  usage: "(Emoji) (Text)",
  category: "Utilities",
  run: async (client, interaction, args) => {
    try {
      const data = await schema.findOne({ Guild: interaction.guild.id });
      if (
        !data ||
        !data.Role ||
        !data.Category ||
        !data.Choices ||
        !Object.entries(data.Choices).length ||
        !interaction.guild.roles.cache.has(data.Role) ||
        !interaction.guild.channels.cache.find(
          value => value.type == "GUILD_CATEGORY" && value.id === data.Category
        )
      ) {
        return interaction.followUp({
          content: `This server isn't setup properly. Please find an administrator or a moderator to specify a category, role and choices for users to create thread. The issue may be caused by invalid role/category.`,
        });
      }
      interaction.deleteReply();
      const choices = Object.entries(data.Choices);
      const embed = new EmbedBuilder()
        .setDescription(
          `Choices of topic:\n${choices
            .map(value => `${value[1].emoji} - ${value[1].text}`)
            .join("\n")}`
        )
        .setAuthor(
          interaction.guild.name,
          interaction.guild.iconURL({ dynamic: true })
        )
        .setColor(client.color)
        .setTimestamp()
        .setTitle(`${interaction.user.tag}'s modmail`);
      const msg = await interaction.user.send({
        content: "Please react below",
        embeds: [embed],
      });
      choices.map(async value => {
        await msg.react(value[1].emoji);
      });
      const filter = (reaction, user) => {
        return (
          choices.map(value => value[1].emoji).includes(reaction.emoji.name) &&
          user.id !== interaction.user.id
        );
      };
      const reactionCollector = msg.createReactionCollector({
        filter,
      });
      let type;
      reactionCollector
        .on("collect", async (reaction, user) => {
          type = choices.find(value => value[1].emoji == reaction.emoji.name);
          await msg.delete();
          reactionCollector.stop("done");
        })
        .on("end", async (collected, reason) => {
          if (reason.toLowerCase() == "time") {
            return interaction.user.send({
              content: "You didn't provide a reaction in-time. Cancelled",
            });
          } else {
            const channel = await interaction.guild.channels.create(
              `${interaction.user.username}-${interaction.user.discriminator}`,
              {
                reason: "Modmail thread",
                parent: data.Category,
                topic: `${type[1].text}`,
                type: "text",
              }
            );
            const transcript = [];
            channel.permissionOverwrites.create(data.Role, {
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
            });
            channel.permissionOverwrites.create(interaction.guild.id, {
              VIEW_CHANNEL: false,
            });
            channel.send({
              content: `A modmail thread has been started by **${interaction.user.tag}** with type: **${type[1].text}**\nUse \`close\` to close the thread`,
            });
            interaction.user.send({
              content: "Thread created. Use `close` to close the thread.",
            });
            const filter = m => !m.author.bot;
            const channelCollector = channel.createMessageCollector({ filter });
            const dmCollector =
              interaction.user.dmChannel.createMessageCollector({
                filter,
              });
            channelCollector.on("collect", async m => {
              if (m.content.toLowerCase().startsWith("close")) {
                interaction.user.send({
                  content: `Admin has closed the thread`,
                });
                channel.send({ content: "Closing.." });
                dmCollector.stop("done");
                channelCollector.stop("done");
                fs.writeFileSync(
                  `./${interaction.user.id}.txt`,
                  transcript.join("\n")
                );
                const attachment = new MessageAttachment(
                  fs.createReadStream(`./${interaction.user.id}.txt`),
                  `Transcript-${interaction.user.id}`
                );
                await channel.send({
                  content: "Transcript:",
                  files: [attachment],
                });
                fs.unlinkSync(`./transcript-${interaction.user.id}.txt`);
                setTimeout(() => {
                  channel.delete();
                }, 1000 * 10);
              }
              interaction.user.send({ content: `**Admin**: ${m.content}` });
              transcript.push(`**Admin**: ${m.content}`);
            });
            dmCollector.on("collect", async m => {
              if (m.content.toLowerCase().startsWith("close")) {
                interaction.user.send({ content: "Closed" });
                channel.send({
                  content: `${interaction.user.tag} has closed the thread`,
                });
                dmCollector.stop("done");
                channelCollector.stop("done");
                fs.writeFileSync(
                  `./${interaction.user.id}.txt`,
                  transcript.join("\n")
                );
                const attachment = new MessageAttachment(
                  fs.createReadStream(`./${interaction.user.id}.txt`),
                  `Transcript-${interaction.user.id}`
                );
                await channel.send({
                  content: "Transcript:",
                  files: [attachment],
                });
                fs.unlinkSync(`./${interaction.user.id}.txt`);
                setTimeout(() => {
                  channel.delete();
                }, 1000 * 60 * 12);
              }
              channel.send({
                content: `**${interaction.user.tag}**: ${m.content}`,
              });
              transcript.push(`**${interaction.user.tag}**: ${m.content}`);
            });
          }
        });
    } catch (e) {
      console.log(e);
      return interaction.followUp({ content: "An error occured" });
    }
  },
};
