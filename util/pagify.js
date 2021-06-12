const Discord = require('discord.js')

async function pagify(client, message, options = {}) {

  if (!(message instanceof Discord.Message))
    throw new TypeError(
      "First parameter must be a type of <discord.js>.Message"
    );
  options = {
    page: options.page,
    type: ["message", "embed"].includes(
      options.type && options.type.toString().toLowerCase()
    )
      ? options.type
      : "message",
    messages: Array.isArray(options.messages) ? options.messages : [],
    pages: options.pages || true
  };
  if (!options.messages.length)
    throw new TypeError("'options.messages' must have at least one element");
  if (
    options.type === "embed" &&
    !options.messages.every(m => m instanceof Discord.MessageEmbed)
  )
    throw new TypeError(
      "'options.type' were chosen as 'embed' but not every element of 'options.messages' were an instance of <discord.js>.MessageEmbed"
    );
  let pages = 0,
    reactions =
      options.messages.length > 1
        ? ["⏪", "◀️", "#️⃣", "▶️", "⏩", "⏹️"]
        : ["⏹️"],
    mainMessage = await message.channel.send(
      `${options.messages.length > 1 && options.pages === true
        ? `[${pages + 1}/${options.messages.length}] ${"○"
          .repeat(options.messages.length)
          .replaceAt(pages, "●")}`
        : ""
      }`,
      options.messages[pages]
    );
  await Promise.all(reactions.map(r => mainMessage.react(r)));
  let collector = mainMessage.createReactionCollector(
    (reaction, user) =>
      reactions.some(r => r === reaction.emoji.name) &&
      user.id === message.author.id,
    {
      time: options.time
    }
  );
  collector.on("collect", async (reaction, user) => {
    switch (reaction.emoji.name) {
      case "⏪":
        if (pages === 0) return;
        pages = 0;
        break;
      case "◀️":
        if (pages === 0) {
          pages = options.messages.length - 1;
        } else {
          pages -= 1;
        }
        break;
      case "⏹️":
        for (let reaction of mainMessage.reactions.cache
          .filter(r => r.users.cache.has(clinet.user.id))
          .array()) {
          await reaction.users.remove(client.user.id);
        }
        return collector.stop();
        break;
      case "▶️":
        if (pages === options.messages.length - 1) {
          pages = 0;
        } else {
          pages += 1;
        }
        break;
      case "⏩":
        if (pages === options.messages.length - 1) return;
        pages = options.messages.length - 1;
        break;
      case "#️⃣":
        let m = await message.channel.send("What page do you wish to go to?");
        let collected = await m.channel.awaitMessages(
          response => message.content,
          {
            max: 1,
            errors: ["time"]
          }
        );
        try {
          m.delete();
          let content = parseInt(collected.first().content);
          if (content && content > 0 && content <= options.messages.length)
            pages = content - 1;
        } catch (err) {
          console.log(err.message);
          m.delete();
        }

        break;
    }
    await mainMessage.edit(
      `${options.messages.length > 1 && options.pages === true
        ? `[${pages + 1}/${options.messages.length}] ${"○"
          .repeat(options.messages.length)
          .replaceAt(pages, "●")}`
        : ""
      }`,
      options.type === "message"
        ? options.messages[pages]
        : {
          embed: options.messages[pages]
        }
    );
  })
}
module.exports = pagify