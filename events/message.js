const client = require("../index");
const leven = require("leven");
const { Collection, MessageEmbed } = require("discord.js");
const { prefix } = require("../config.json");
const guilds = require("../models/guilds");
const ms = require("ms");
const schema = require("../models/custom-commands");
const Timeout = new Collection();
const Timeout2 = new Collection();
client.on("message", async message => {
  const p = await client.prefix(message);
  if (message.author.bot) return;
  if (!message.content.startsWith(p)) return;
  if (!message.guild) return;
  if (!message.member) {
    message.member = await message.guild.fetchMember(message);
  }
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    const _ = new MessageEmbed()
      .setTitle("cath.exe")
      .addField("Links:", client.cat)
      .addField(
        "Prefix/Usage",
        `My prefix in **${message.guild.name}** is **${p}**\n\nRun \`${p}help\` to start using the bot`
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setURL(client.web)
      .setFooter("Made by Cath Team")
      .setTimestamp()
      .setColor(client.color);
    return message.inlineReply(_).then(m => m.delete({ timeout: 10000 }));
  }
  const data = {};
  let guildDB = await client.data.getGuild(message.guild.id);
  if (!guildDB) return;
  let userDB = await client.data.getUser(message.author.id);
  if (!userDB) return;
  let botDB = await client.data.getBot(client.user.id);
  if (!botDB) return;
  data.Bot = botDB;
  data.Guild = guildDB;
  data.User = userDB;
  if (
    botDB &&
    botDB.Status == "true" &&
    !client.owners.includes(message.author.id)
  )
    return message.inlineReply(
      `**${client.user.username}** is currently in maintenance.\nYou can use **cath.exe#9686** or **Cath 2#7414** if it is online\nIf you need help, please contact **Cat drinking a cat#0795** or **Ń1ght#0001**`
    );
  if (!guildDB) {
    await client.data.CreateGuild(message.guild.id);
  }
  if (data.User) {
    if (data.User.Blacklist) {
      return;
    }
  }
  guilds.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (data) {
      if (!data.Prefix || data.Prefix === null) {
        (data.Prefix = prefix),
          await guilds.findOneAndUpdate({ Guild: message.guild.id }, data);
      }
    }
    if (!data) {
      new guilds({
        Guild: message.guild.id,
        Prefix: prefix,
      }).save();
    }
  });
  const args = message.content.slice(p.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  const cmddata = await schema.findOne({
    Guild: message.guild.id,
    Command: cmd,
  });
  if (!cmddata) {
    let command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) {
      const best = [
        ...client.commands.map(cmd => cmd.name),
        ...client.aliases.keys(),
      ].filter(c => leven(cmd.toLowerCase(), c.toLowerCase()) < c.length * 0.4);
      const dym =
        best.length == 0
          ? ""
          : best.length == 1
          ? `Do you mean this?\n**${best[0]}**`
          : `Do you mean one of these?\n${best
              .slice(0, 3)
              .map(value => `**${value}**`)
              .join("\n")}`;
      if (dym === "") return;
      return message
        .inlineReply(
          new MessageEmbed()
            .setDescription(`Couldn't find that command.\n${dym}`)
            .setTimestamp()
            .setColor(client.color)
        )
        .then(msg => msg.delete({ timeout: 10000 }));
    }
    if (command) {
      if (command.Owner == true) {
        if (!client.owners.includes(message.author.id)) return;
      }
      if (command.Premium == true) {
        if (data.User.Premium == false) {
          return message.inlineReply(
            new MessageEmbed()
              .setURL(client.web)
              .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setColor(client.color)
              .setDescription(
                `You aren't a premium user. Please join [this](https://discord.gg/SbQHChmGcp) server and know more`
              )
              .setTimestamp()
              .setFooter(`Made by Cath Team`)
          );
        }
      }
      if (!message.member.permissions.has(command.UserPerm)) return;
      if (!message.guild.me.permissions.has(command.BotPerm))
        return message.inlineReply(
          `You can't use this command. I need to have ${command.BotPerm} permission to use this command.`
        );
      client.CMDLog.send(
        `\`${message.author.tag}(${message.author.id})\`\n has used \n**${command.name}**\n command in \n\`${message.guild.name}(${message.guild.id})\``
      );
      const category = command.category;
      if (data.Guild) {
        if (data.Guild.Category) {
          if (data.Guild.Category.includes(category)) return;
        }
        if (data.Guild.Commands) {
          if (data.Guild.Commands.includes(command.name)) return;
        }
      }
      const check = await guilds.findOne({
        Guild: message.guild.id,
      });
      if (check) {
        if (!check.Prefix) {
          check.Prefix = prefix;
        } else;
      }
      if (command.timeout) {
        const slow = [
          "Keep it slow...",
          "Calm down",
          "Stop it get some help",
          "Too fast",
        ];
        const slowed = slow[Math.floor(Math.random() * slow.length)];
        if (Timeout.has(`${command.name}${message.author.id}`))
          return message.channel.send(
            new MessageEmbed()
              .setColor(client.color)
              .setTimestamp()
              .setTitle(slowed)
              .setDescription(
                `You are on a \`${ms(
                  Timeout.get(`${command.name}${message.author.id}`) -
                    Date.now(),
                  { long: true }
                )}\` cooldown.`
              )
          );
        command.run(client, message, args);
        Timeout.set(
          `${command.name}${message.author.id}`,
          Date.now() + command.timeout
        );
        setTimeout(() => {
          Timeout.delete(`${command.name}${message.author.id}`);
        }, command.timeout);
      } else command.run(client, message, args);
    }
  } else {
    if (cmddata.Delete === true && cmddata.Random === false) {
      message.delete().then(() => message.channel.send(cmddata.Response));
    } else if (cmddata.Random === true && cmddata.Delete === true) {
      const randomed =
        cmddata.Response[Math.floor(Math.random() * cmddata.Response.length)];
      message.delete().then(() => message.channel.send(randomed));
    } else if (cmddata.Random === true && cmddata.Delete === false) {
      const randomed =
        cmddata.Response[Math.floor(Math.random() * cmddata.Response.length)];
      message.channel.send(randomed);
    } else {
      message.channel.send(cmddata.Response);
    }
  }
});
client.on("message", async message => {
  const p = await client.prefix(message);
  if (message.author.bot) return;
  if (!message.content.startsWith(p)) return;
  if (!message.guild) return;
  if (!message.member) {
    message.member = await message.guild.fetchMember(message);
  }
  const args = message.content.slice(p.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let path = client.hide.get(cmd);
  if (path) {
    if (!client.path.includes(message.guild.id)) return;
    client.CMDLog.send(
      `\`${message.author.tag}(${message.author.id})\`\n has used \n**${path.name}**\n command in \n\`${message.guild.name}(${message.guild.id})\``
    );
    if (path.timeout) {
      const slow = [
        "Keep it slow...",
        "Calm down",
        "Stop it get some help",
        "Too fast",
      ];
      const slowed = slow[Math.floor(Math.random() * slow.length)];
      if (Timeout2.has(`${path.name}${message.author.id}`))
        return message.channel.send(
          new MessageEmbed()
            .setColor(client.color)
            .setTimestamp()
            .setTitle(slowed)
            .setDescription(
              `You are on a \`${ms(
                Timeout2.get(`${path.name}${message.author.id}`) - Date.now(),
                { long: true }
              )}\` cooldown.`
            )
        );
      path.run(client, message, args);
      Timeout2.set(
        `${path.name}${message.author.id}`,
        Date.now() + path.timeout
      );
      setTimeout(() => {
        Timeout2.delete(`${path.name}${message.author.id}`);
      }, path.timeout);
    } else path.run(client, message, args);
  }
});
client.on("message", async message => {
  const p = await client.prefix(message);
  if (
    message.channel.type === "dm" &&
    !message.content.startsWith(p) &&
    !message.author.bot
  ) {
    var attachment = message.attachments.array();
    client.DMLog.send(
      `\`${message.author.tag}(${message.author.id})\`: ` + message.content
    );
    if (attachment[0]) client.DMLog.send(attachment);
  }
});
/*
client.on("message", async (message) => {
  if (message.author.bot) return;
  let wordArray = message.content.split(" ");
  let filterWords = ["bruh", "Bruh"];
  for (var i = 0; i < filterWords.length; i++) {
    if (wordArray.includes(filterWords[i])) {
      message.react("<a:cat_triggered:808684186633633822>");
      break;
    }
  }
});
*/
