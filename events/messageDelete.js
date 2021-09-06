const client = require("../bot");
client.on("messageDelete", async message => {
  let all = [];
  if (message.attachments) {
    const mapped = message.attachments.map(a => {
      if (
        a.name.endsWith(".png") ||
        a.name.endsWith(".jpg") ||
        a.name.endsWith(".jpeg") ||
        a.name.endsWith(".gif") ||
        a.name.endsWith(".webp")
      )
        return message.attachments.first().proxyURL;
      else return message.attachments.first().url;
    });
    if (mapped.length == 1) {
      all.push(mapped);
    } else if (mapped.length > 1) {
      message.attachments.map(b => {
        all.push(mapped);
      });
    }
  }
  client.snipes.push({
    channel: message.channel,
    content: message.content ? message.content : "None",
    author: message.author ? message.author : "No Author",
    attachment: message.attachments ? all : null,
    date: new Date(),
  });
});
