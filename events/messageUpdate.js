const client = require("../bot");
client.on("messageUpdate", (message, newMessage) => {
  function getAllTextFromEmbed(embed) {
    let text = "";
    function getTime(now) {
      const date = new Date(now);
      const escape = value => `0${value}`.slice(-2);
      const ampm = date.getHours() >= 12 ? "PM" : "AM";

      return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${escape(
        date.getHours()
      )}:${escape(date.getMinutes())}:${escape(date.getSeconds())}${ampm}`;
    }

    if (embed.title)
      text += `**${embed.title
        .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
        .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}**`;
    if (embed.description)
      text += `\n${embed.description
        .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
        .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}`;
    if (embed.fields) {
      text += "\n";
      for (const field of embed.fields)
        text += `\n**${field.name
          .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
          .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}**\n ${field.value
          .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
          .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}`;
    }
    if (embed.footer) {
      let field = `\n\n**${embed.footer.text
        .replace(/(https?:\/\/)?discord\.gg\/(\w+)/g, "Invite")
        .replace(/\[(.*)\]\((.*)\)/g, "Hyper link")}`;

      if (embed.timestamp) {
        const time =
          embed.timestamp instanceof Date
            ? getTime(embed.timestamp.getTime())
            : embed.timestamp;
        field += `at ${time}`;
      }

      text += `${field}**`;
    }

    return text;
  }
  let snipes = client.esnipes.get(message.channel.id) || [];
  snipes.unshift({
    content:
      message.embeds.length > 0
        ? getAllTextFromEmbed(message.embeds[0])
        : message.content,
    newContent:
      newMessage.embeds.length > 0
        ? getAllTextFromEmbed(newMessage.embeds[0])
        : newMessage.content,
    author: message.author ? message.author.id : "No author found??",
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : message.embeds.length > 0 && message.embeds[0].image
      ? message.embeds[0].image.url
      : "",
    date: Date.now(),
  });
  client.esnipes.set(message.channel.id, snipes);
});
