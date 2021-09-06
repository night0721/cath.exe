const Discord = require("discord.js");
module.exports = {
  name: "eval",
  category: "Owner",
  aliases: ["e"],
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
  run: async (client, interaction, args) => {
    let code = args[0];
    function CheckFilter(object) {
      if (typeof object === "string") {
        object = object.replace(
          new RegExp(client.token || process.env.TOKEN, "gi"),
          "Cannot eval Token"
        );
      } else if (typeof object === "object") {
        if (Array.isArray(object)) {
          for (let i = 0; i < object.length; i++) {
            object[i] = CheckFilter(object[i]);
          }
        } else {
          for (let key in object) {
            object[key] = CheckFilter(object[key]);
          }
        }
      }
      return object;
    }
    let oldSend = Discord.TextChannel.prototype.send;
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
    evaled = new (require("string-toolkit"))().toChunks(evaled, 750);
    let reactions = ["❌", "⏪", "◀️", "⏹️", "▶️", "⏩"],
      page = 0,
      evaledEmbed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(`\`\`\`js\n${evaled[0]}\n\`\`\``)
        .setTimestamp()
        .setAuthor(
          `Evaled by ${interaction.user.tag}`,
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .addField(`Type of`, `\`\`\`js\n${typeof evaled[0]}\n\`\`\``);
    let mainMessage = await interaction.channel.send({ embeds: [evaledEmbed] });
    Discord.TextChannel.prototype.send = oldSend;
    await Promise.all(
      (evaled.length === 1 ? ["❌", "⏹️"] : reactions).map(r =>
        mainMessage.react(r)
      )
    );
    let filter = (reaction, user) =>
      (evaled.length === 1 ? ["❌", "⏹️"] : reactions).some(
        e => e === reaction.emoji.name
      ) && user.id === interaction.user.id;
    let collector = mainMessage.createReactionCollector(filter, {
      time: 300000,
    });
    collector.on("collect", async (reaction, user) => {
      switch (reaction.emoji.name) {
        case "❌":
          await collector.stop();
          return mainMessage.delete();
          break;
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
          for (let reaction of mainMessage.reactions.cache.map(e => e)) {
            await reaction.users.remove(client.user.id);
          }
          return;
          break;
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
        .setDescription(`\`\`\`js\n${evaled[page]}\n\`\`\``)
        .addField(`Type of`, `\`\`\`js\n${typeof evaled[page]}\n\`\`\``);

      await mainMessage.edit({
        embeds: [evaledEmbed],
      });
    });
  },
};
