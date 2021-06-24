const { Client, Message, MessageEmbed } = require("discord.js");
module.exports = {
  name: "restart",
  category: "Owner",
  description: "Restart the bot",
  Owner: true,
  run: async (client, message, args) => {
    const msg = await message.channel.send("Restarting...");
    await client.destroy();
    await client.login(process.env.TOKEN);
    await msg.delete().then(msg => message.channel.send("Restarted"));
  },
};
