const client = require("../bot");
client.on("messageUpdate", async (message, newMessage) => {
  let all = [];
  if (message.attachments) {
    const files = message.attachments.map(e => e);
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      all.push(file.url);
    }
  }
  if (message.embeds) {
    for (var i = 0; i < message.embeds.length; i++) {
      const files = message.embeds.map(e => e.image?.url);
      all.push(files);
    }
  }
  const esnipes = client.esnipes.get(message.channel.id) || [];
  esnipes.push({
    channel: message.channel,
    oldContent: message.content ? message.content : "None",
    newContent: newMessage.content ? newMessage.content : "None",
    author: message.author ? message.author : "No Author",
    attachment: message.attachments ? all : null,
    date: new Date(),
  });
  esnipes.splice(10);
  client.esnipes.set(message.channel.id, esnipes);
});
