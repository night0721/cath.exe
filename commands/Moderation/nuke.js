const { Client, Message } = require("discord.js");
module.exports = {
  name: "nuke",
  description: "Destroy a channel and create a new one",
  usage: "{Channel}",
  UserPerm: "MANAGE_CHANNELS",
  BotPerm: "MANAGE_CHANNELS",
  category: "Moderation",
  run: async (client, message, args) => {
    try {
      let filter = m => m.author.id === message.author.id;
      message.channel.send("Do you want to nuke this channel? (Yes/No)");
      message.channel
        .awaitMessages(filter, {
          max: 1,
          time: 99999,
          errors: ["time"],
        })
        .then(msg => {
          message = msg.first();
          if (
            message.content.toLowerCase() == "yes" ||
            message.content.toLowerCase() == "y"
          ) {
            let channel = client.channels.cache.get(message.channel.id);
            channel.clone().then(ch => {
              if (channel.parent) {
                ch.setParent(channel.parent.id);
              } else;
              ch.setPosition(channel.position);
              channel.delete();
              ch.send(
                "https://i.pinimg.com/originals/06/c3/92/06c392b847166a9a671bfcd590d8fff7.gif \nFriendly nuke has been launched."
              );
            });
          } else if (
            message.content.toLowerCase() == "no" ||
            message.content.toLowerCase() == "n"
          ) {
            message.delete();
            return message.channel.send("The process has been cancelled");
          } else {
            message.delete();
            return message.channel.send(
              `The process has been cancelled due to invalid response`
            );
          }
        });
    } catch (e) {
      console.log(e);
      return client.err(message, "Moderation", "nuke", 999);
    }
  },
};
