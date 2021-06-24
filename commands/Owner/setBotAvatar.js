const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "setavatar",
  category: "Owner",
  usage: "(Link)",
  description: "Set bot avatar from a link",
  Owner: true,
  run: async (client, message, args) => {
    if (message.deletable) {
      message.delete();
    }
    if (!args || args.length < 1) {
      return client.err(message, "Owner", "setBotAvatar", 404);
    }
    client.user.setAvatar(args.join(" "));
    message.channel
      .send("Profile picture has been changed.")
      .then(m => m.delete({ timeout: 10000 }));
  },
};
