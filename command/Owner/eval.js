const Discord = require("discord.js");
module.exports = {
  name: "eval",
  category: "Owner",
  usage: "(Code)",
  Owner: true,
  description: "Eval something",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "code",
      description: "The code to eval",
      required: true,
    },
  ],
  run: async (client, interaction, args, utils) => {
    const code = args[0];
    function CheckFilter(object) {
      if (typeof object === "string") {
        object = object.replace(
          new RegExp(`${client.token || process.env.TOKEN}`, "gi"),
          "Cannot eval Token"
        );
      } else if (typeof object === "object") {
        if (Array.isArray(object)) {
          for (let i = 0; i < object.length; i++) {
            object[i] = CheckFilter(object[i]);
          }
        } else {
          for (const key in object) {
            object[key] = CheckFilter(object[key]);
          }
        }
      }
      return object;
    }
    const oldSend = Discord.TextChannel.prototype.send;
    Discord.TextChannel.prototype.send = async function send(content, options) {
      return oldSend.bind(this)(CheckFilter(content), CheckFilter(options));
    };
    let evaled;
    try {
      evaled = eval(code);
      if (evaled instanceof Promise) evaled = await evaled;
    } catch (err) {
      evaled = err;
    }
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    console.log(evaled);
    evaled = chunk([evaled], 750);
    console.log(evaled);
    let reactions = ["❌", "⏪", "◀️", "⏹️", "▶️", "⏩"],
      page = 0,
      evaledEmbed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(`\`\`\`js\n${evaled[0]}\n\`\`\``)
        .setTimestamp()
        .setAuthor({
          name: `Evaled by ${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        });
    const mainMessage = await interaction.channel.send({
      embeds: [evaledEmbed],
    });
    Discord.TextChannel.prototype.send = oldSend;
    await Promise.all(
      (evaled.length === 1 ? ["❌", "⏹️"] : reactions).map(r =>
        mainMessage.react(r)
      )
    );
    const filter = (reaction, user) =>
      (evaled.length === 1 ? ["❌", "⏹️"] : reactions).some(
        e => e === reaction.emoji.name
      ) && user.id === interaction.user.id;
    const collector = mainMessage.createReactionCollector({
      filter,
      time: 999999,
    });
    collector.on("collect", async reaction => {
      switch (reaction.emoji.name) {
        case "❌":
          await collector.stop();
          return mainMessage.delete();
        case "⏪":
          if (evaled.length === 1 || page === 0) return;
          page = 0;
          break;
        case "◀️":
          if (evaled.length === 1) return;
          if (page === 0) {
            page = evaled.length - 1;
          } else {
            page -= 1;
          }
          break;
        case "⏹️":
          await collector.stop();
          for (const reaction of mainMessage.reactions.cache.map(e => e)) {
            await reaction.users.remove(client.user.id);
          }
          return;
        case "▶️":
          if (evaled.length === 1) return;
          if (page === evaled.length - 1) {
            page = 0;
          } else {
            page += 1;
          }
          break;
        case "⏩":
          if (evaled.length === 1 || page === evaled.length - 1) return;
          page = evaled.length - 1;
          break;
      }
      evaledEmbed = new Discord.MessageEmbed()
        .setColor(interaction.guild.me.displayColor)
        .setDescription(`\`\`\`js\n${evaled[page]}\n\`\`\``);
      await mainMessage.edit({
        embeds: [evaledEmbed],
      });
    });
  },
};
function chunk(arr, size) {
  let c;
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
    c = arr.slice(i * size, i * size + size);
  });
  return c;
}
