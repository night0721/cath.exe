const client = require("../bot");
client.on("message", async message => {
  function Check(str) {
    if (
      client.emojis.cache.find(emoji => emoji.name === str) ||
      message.guild.emojis.cache.find(emoji => emoji.name === str)
    ) {
      return true;
    } else {
      return false;
    }
  }
  if (message.content.startsWith(":") && message.content.endsWith(":")) {
    let EmojiName = message.content.slice(1, -1);
    if (client.path.includes(message.guild.id)) return;
    if (Check(EmojiName) === true) {
      const channel = client.channels.cache.get(message.channel.id);
      try {
        if (message.author.bot) return;
        let webhooks = await channel.fetchWebhooks();
        let webhook = webhooks.first();
        if (webhook === undefined || null || !webhook) {
          channel
            .createWebhook(client.user.username, {
              avatar: client.user.displayAvatarURL(),
            })
            .then(async webhook => {
              const emoji =
                client.emojis.cache.find(e => e.name == EmojiName).id ||
                message.guild.emojis.cache.find(e => e.name === EmojiName).id;

              await webhook.send(`${client.emojis.cache.get(emoji)}`, {
                username: message.member.displayName
                  ? message.member.displayName
                  : message.author.username,
                avatarURL: message.author.displayAvatarURL({ dynamic: true }),
              });
              message.delete();
            });
        }
        const emoji =
          client.emojis.cache.find(e => e.name == EmojiName).id ||
          message.guild.emojis.cache.find(e => e.name === EmojiName).id;

        await webhook.send(`${client.emojis.cache.get(emoji)}`, {
          username: message.author.username,
          avatarURL: message.author.displayAvatarURL({ dynamic: true }),
        });
        message.delete();
      } catch (e) {
        console.log(e);
      }
    } else return;
  } else return;
});
