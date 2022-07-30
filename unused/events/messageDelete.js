const client = require("../");
client.on("messageDelete", async message => {
  const all = [];
  if (message.attachments) {
    const files = message.attachments.map(e => e);
    for (let i = 0; i < files.length; i++) {
      all.push(files[i].url);
    }
  }
  if (message.embeds) {
    for (let i = 0; i < message.embeds.length; i++) {
      const files = message.embeds.map(e => e.image?.url);
      all.push(files);
    }
  }
  const snipes = client.snipes.get(message.channel.id) || [];
  snipes.push({
    channel: message.channel,
    content: message.content ? message.content : "None",
    author: message.author ? message.author : "No Author",
    attachment: message.attachments ? all : null,
    date: new Date(),
  });
  snipes.splice(10);
  client.snipes.set(message.channel.id, snipes);
});
