const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "nuke",
  description: "Destroy a channel and create a new one",
  usage: "{Channel}",
  UserPerms: ["MANAGE_CHANNELS"],
  BotPerms: ["MANAGE_CHANNELS"],
  category: "Moderation",
  run: async (client, interaction, args) => {
    try {
      const filter = m => m.author.id === interaction.user.id;
      interaction.followUp({
        content: "Do you want to nuke this channel?\n (Type `Yes` or `no`)",
      });
      interaction.channel
        .awaitMessages({
          filter,
          max: 1,
          time: 99999,
          errors: ["time"],
        })
        .then(msg => {
          const message = msg.first();
          if (
            message.content.toLowerCase() == "yes" ||
            message.content.toLowerCase() == "y"
          ) {
            const channel = message.guild.channels.cache.get(
              message.channel.id
            );
            channel.clone().then(ch => {
              if (channel.parent) {
                ch.setParent(channel.parent.id);
              } else {
              }
              ch.setPosition(channel.position);
              channel.delete();
              ch.send({
                files: [
                  new MessageAttachment(
                    "https://i.pinimg.com/originals/06/c3/92/06c392b847166a9a671bfcd590d8fff7.gif"
                  ),
                ],
                content: "\nFriendly nuke has been launched.",
              });
            });
          } else if (
            message.content.toLowerCase() == "no" ||
            message.content.toLowerCase() == "n"
          ) {
            message.delete();
            return message.channel.send({
              content: "The process has been cancelled",
            });
          } else {
            message.delete();
            return message.channel.send({
              content: `The process has been cancelled due to invalid response`,
            });
          }
        });
    } catch (e) {
      console.log(e);
      interaction.followUp({ content: `**Error**: ${e.message}` });
    }
  },
};
