const client = require("../bot");
const leven = require("leven");
const { Collection, MessageEmbed } = require("discord.js");
const { prefix } = require("../config.json");
const guilds = require("../models/guilds");
const ms = require("ms");
const schema = require("../models/custom-commands");
const Timeout2 = new Collection();
const db = require("../models/bot");
const cooldown = require("../models/cooldown");
client.on("message", async message => {
  const p = await client.prefix(message);
  if (message.author.bot) return;
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    const _ = new MessageEmbed()
      .setTitle(client.user.username)
      .addField("Links:", client.cat)
      .addField(
        "Prefix/Usage",
        `My prefix in **${message.guild.name}** is **${p}**\n\nRun \`${p}help\` to start using the bot`
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setURL(client.web)
      .setFooter(`Made by ${client.author}`)
      .setTimestamp()
      .setColor(client.color);
    return message.inlineReply(_).then(m => m.delete({ timeout: 15000 }));
  }
  if (!message.guild) return;
  if (!message.content.toLowerCase().startsWith(p.toLowerCase())) return;
  if (!message.member) {
    message.member = await message.guild.fetchMember(message);
  }
  db.findOne({ Bot: client.user.id }, async (err, data) => {
    if (!data) {
      new db({
        Bot: client.user.id,
        Status: "false",
      });
    } else {
      if (
        data.Status &&
        data.Status == "true" &&
        !client.owners.includes(message.author.id)
      )
        return message.inlineReply(
          `**${client.user.username}** is currently in maintenance.\nYou can use **cath.exe#9686** or **Cath 2#7414** if it is online\nIf you need help, please contact **Cat drinking a cat#0795** or **Ń1ght#0001**`
        );
    }
  });
  const data = {};
  let guildDB = await client.data.getGuild(message.guild.id);
  if (!guildDB) return;
  let userDB = await client.data.getUser(message.author.id);
  if (!userDB) return;
  let userEconDB = await client.data.getUserEcon(message.author.id);
  data.Guild = guildDB;
  data.User = userDB;
  data.UserEcon = userEconDB;
  if (!guildDB) {
    await client.data.CreateGuild(message.guild.id);
  }
  if (!userEconDB) {
    await client.createProfile(message.author.id);
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
          return message
            .inlineReply(
              new MessageEmbed()
                .setURL(client.web)
                .setAuthor(
                  message.author.tag,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setColor(client.color)
                .setDescription(
                  `You aren't a premium user. You can either boost support server or gift a nitro to one of the Developer of Cath Team to be premium user`
                )
                .setTimestamp()
                .setFooter(`Made by ${client.author}`)
            )
            .then(m => m.delete({ timeout: 10000 }));
        }
      }
      if (command.Disable == true) {
        return message
          .inlineReply(
            `**${command.name}** command is currently in maintenance.\nYou can use **cath.exe#9686** or **Cath 2#7414** if it is online\nIf you need help, please contact **Cat drinking a cat#0795** or **Ń1ght#0001**`
          )
          .then(m => m.delete({ timeout: 10000 }));
      }
      if (command.Level == true) {
        if (data.Guild.Level == false) {
          return message
            .inlineReply(
              `This command is disabled due to levelling system is disabled in this server`
            )
            .then(m => m.delete({ timeout: 10000 }));
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
        const current_time = Date.now();
        const cooldown_amount = command.timeout;
        cooldown.findOne(
          { User: message.author.id, CMD: command.name },
          async (err, dataa) => {
            if (dataa) {
              if (data.User.Premium == true) {
                if (command.timeout > 1000 * 60 * 60) {
                  const expiration_time = dataa.Time + command.timeout;
                  if (current_time < expiration_time) {
                    const time_left = expiration_time - current_time;
                    const slow = [
                      "Keep it slow...",
                      "Calm down",
                      "Stop it get some help",
                      "Too fast",
                    ];
                    const slowed =
                      slow[Math.floor(Math.random() * slow.length)];
                    return message.channel
                      .send(
                        new MessageEmbed()
                          .setColor(client.color)
                          .setTimestamp()
                          .setTitle(slowed)
                          .setDescription(
                            `Wait **${client.function.timer(
                              time_left
                            )}** to use the command again!\nThe default cooldown is **${client.function.timer(
                              command.timeout
                            )}**`
                          )
                      )
                      .then(m => m.delete({ timeout: 10000 }));
                  } else {
                    await cooldown.findOneAndUpdate(
                      { User: message.author.id, CMD: command.name },
                      { Time: current_time }
                    );
                    command.run(client, message, args, data);
                    client.addcmdsused(message.author.id);
                  }
                } else {
                  const expiration_time = dataa.Time + command.timeout / 2;
                  if (current_time < expiration_time) {
                    const time_left = expiration_time - current_time;
                    const slow = [
                      "Keep it slow...",
                      "Calm down",
                      "Stop it get some help",
                      "Too fast",
                    ];
                    const slowed =
                      slow[Math.floor(Math.random() * slow.length)];
                    return message.channel
                      .send(
                        new MessageEmbed()
                          .setColor(client.color)
                          .setTimestamp()
                          .setTitle(slowed)
                          .setDescription(
                            `Wait **${client.function.timer(
                              time_left
                            )}** to use the command again!\nThe default cooldown is **${client.function.timer(
                              command.timeout
                            )}**, since you are **[premium](${
                              client.invite
                            })** users, you only need to wait **${client.function.timer(
                              command.timeout / 2
                            )}**`
                          )
                      )
                      .then(m => m.delete({ timeout: 10000 }));
                  } else {
                    await cooldown.findOneAndUpdate(
                      { User: message.author.id, CMD: command.name },
                      { Time: current_time }
                    );
                    command.run(client, message, args, data);
                    client.addcmdsused(message.author.id);
                  }
                }
              } else {
                const expiration_time = dataa.Time + cooldown_amount;
                if (current_time < expiration_time) {
                  const time_left = expiration_time - current_time;
                  const slow = [
                    "Keep it slow...",
                    "Calm down",
                    "Stop it get some help",
                    "Too fast",
                  ];
                  const slowed = slow[Math.floor(Math.random() * slow.length)];
                  return message.channel
                    .send(
                      new MessageEmbed()
                        .setColor(client.color)
                        .setTimestamp()
                        .setTitle(slowed)
                        .setDescription(
                          `Wait **${client.function.timer(
                            time_left
                          )}** to use the command again!\nThe default cooldown is **${client.function.timer(
                            command.timeout
                          )}**, but **[premium](${
                            client.invite
                          })** users only need to wait **${client.function.timer(
                            command.timeout / 2
                          )}**`
                        )
                    )
                    .then(m => m.delete({ timeout: 10000 }));
                } else {
                  await cooldown.findOneAndUpdate(
                    { User: message.author.id, CMD: command.name },
                    { Time: current_time }
                  );
                  command.run(client, message, args, data);
                  client.addcmdsused(message.author.id);
                }
              }
            } else {
              command.run(client, message, args, data);
              client.addcmdsused(message.author.id);
              new cooldown({
                User: message.author.id,
                CMD: command.name,
                Time: current_time,
                Cooldown: command.timeout,
              }).save();
            }
          }
        );
      } else {
        command.run(client, message, args, data);
        client.addcmdsused(message.author.id);
      }
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
        return message.channel
          .send(
            new MessageEmbed()
              .setColor(client.color)
              .setTimestamp()
              .setTitle(slowed)
              .setDescription(
                `Wait **${client.function.timer(
                  time_left
                )}** to use the command again!\nThe default cooldown is **${client.function.timer(
                  command.timeout
                )}**`
              )
          )
          .then(m => m.delete({ timeout: 10000 }));
      path.run(client, message, args);
      client.addcmdsused(message.author.id);
      Timeout2.set(
        `${path.name}${message.author.id}`,
        Date.now() + path.timeout
      );
      setTimeout(() => {
        Timeout2.delete(`${path.name}${message.author.id}`);
      }, path.timeout);
    } else {
      path.run(client, message, args);
      client.addcmdsused(message.author.id);
    }
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
    client.channels.cache
      .get(client.DMLog)
      .send(
        `\`${message.author.tag}(${message.author.id})\`: ` + message.content
      );
    if (attachment[0]) client.DMLog.send(attachment);
    if (attachment[1]) client.DMLog.send(attachment);
    if (attachment[2]) client.DMLog.send(attachment);
    if (attachment[3]) client.DMLog.send(attachment);
    if (attachment[4]) client.DMLog.send(attachment);
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
