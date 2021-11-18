const client = require("../");
client.on("messageCreate", async message => {
  if (message.author.bot || !message.guild) return;
  const dataa = await client.data.getUser(message.author.id);
  if (dataa?.AFK) {
    message.reply({
      content: `Welcome back <@${dataa.User}>! I have removed your AFK status.`,
    });
    const nothahaa = message.guild.members.cache.get(message.author.id);
    nothahaa.setNickname(`${message.author.username}`).catch();
    await client.data.DelAFK(message.author.id);
  }
  if (message.mentions.users.first()) {
    const data1 = await client.data.getUser(
      message.mentions.members.first().id
    );
    if (data1?.AFK) {
      message.reply({
        content: `**${
          message.mentions.members.first().user.tag
        }** is in afk **(${data1.AFK})**`,
      });
    }
  }
});
