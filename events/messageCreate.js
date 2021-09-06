const client = require("../bot");
const leven = require("leven");
const { Collection, MessageEmbed, Permissions } = require("discord.js");
const { prefix } = require("../config.json");
const guilds = require("../models/guilds");
const schema = require("../models/custom-commands");
const Timeout2 = new Collection();
const db = require("../models/bot");
const cooldown = require("../models/cooldown");
client.on("messageCreate", async message => {
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
    const m = await message.reply({ embeds: [_] });
    setTimeout(() => m.delete(), 15000);
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
        return message.reply({
          content: `**${client.user.username}** is currently in maintenance.\nYou can use **cath.exe#9686** or **Cath 2#7414** if it is online\nIf you need help, please contact **Cat drinking a cat#0795** or **Ń1ght#0001**`,
        });
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
  if (!guildDB) await client.data.CreateGuild(message.guild.id);
  if (!userEconDB) await client.createProfile(message.author.id);
  if (data.User) {
    if (data.User.Blacklist) {
      return;
    }
  }
  const [cmd, ...args] = message.content.slice(p.length).trim().split(/ +/g);
  if (cmd.length == 0) return;
  const cmddata = await schema.findOne({
    Guild: message.guild.id,
    Command: cmd,
  });
  if (!cmddata) {
    const command =
      client.commands.get(cmd.toLowerCase()) ||
      client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
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
      else {
        const msg = await message.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(`Couldn't find that command.\n${dym}`)
              .setTimestamp()
              .setColor(client.color),
          ],
        });
        setTimeout(function () {
          msg.delete();
        }, 10000);
      }
    }
    if (command) {
      if (command.Owner == true) {
        if (!client.owners.includes(message.author.id)) return;
      }
      if (command.Premium == true) {
        if (data.User.Premium == false) {
          return message.reply({
            embeds: [
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
                .setFooter(`Made by ${client.author}`),
            ],
          });
        }
      }
      if (!message.guild.me.permissions.has(command.BotPerm || []))
        return message.reply({
          content: `You can't use this command. I need to have ${command.BotPerm} permission to use this command.`,
        });
      client.channels.cache.get(client.CMDLog).send({
        content: `\`${message.author.tag}(${message.author.id})\`\n has used \n**${command.name}**\n command in \n\`${message.guild.name}(${message.guild.id})\``,
      });
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
          async (err, data) => {
            if (data) {
              const expiration_time = data.Time + cooldown_amount;
              if (current_time < expiration_time) {
                const time_left = expiration_time - current_time;
                const slow = [
                  "Keep it slow...",
                  "Calm down",
                  "Stop it get some help",
                  "Too fast",
                ];
                const slowed = slow[Math.floor(Math.random() * slow.length)];
                return message.channel.send({
                  embeds: [
                    new MessageEmbed()
                      .setColor(client.color)
                      .setTimestamp()
                      .setTitle(slowed)
                      .setDescription(
                        `You are on a \`${client.function.timer(
                          time_left
                        )}\` cooldown.`
                      ),
                  ],
                });
              } else {
                await cooldown.findOneAndUpdate(
                  { User: message.author.id, CMD: command.name },
                  { Time: current_time }
                );
                command.run(client, message, args, data);
                client.addcmdsused(message.author.id);
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
      message
        .delete()
        .then(() => message.channel.send({ content: cmddata.Response }));
    } else if (cmddata.Random === true && cmddata.Delete === true) {
      const randomed =
        cmddata.Response[Math.floor(Math.random() * cmddata.Response.length)];
      message.delete().then(() => message.channel.send({ content: randomed }));
    } else if (cmddata.Random === true && cmddata.Delete === false) {
      const randomed =
        cmddata.Response[Math.floor(Math.random() * cmddata.Response.length)];
      message.channel.send({ content: randomed });
    } else {
      message.channel.send({ content: cmddata.Response });
    }
  }
});
client.on("messageCreate", async message => {
  const p = await client.prefix(message);
  if (message.author.bot) return;
  if (!message.content.startsWith(p)) return;
  if (!message.guild) return;
  if (!message.member) {
    message.member = await message.guild.fetchMember(message);
  }
  const [cmd, ...args] = message.content.slice(p.length).trim().split(/ +/g);
  if (cmd.length == 0) return;
  let path = client.hide.get(cmd);
  if (path) {
    if (!client.path.includes(message.guild.id)) return;
    client.channels.cache.get(client.CMDLog).send({
      content: `\`${message.author.tag}(${message.author.id})\`\n has used \n**${path.name}**\n command in \n\`${message.guild.name}(${message.guild.id})\``,
    });
    if (path.timeout) {
      if (Timeout2.has(`${path.name}${message.author.id}`)) {
        const slow = [
          "Keep it slow...",
          "Calm down",
          "Stop it get some help",
          "Too fast",
        ];
        const slowed = slow[Math.floor(Math.random() * slow.length)];
        const time_left =
          Timeout2.get(`${path.name}${message.author.id}`) - Date.now();
        const msg = await message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor(client.color)
              .setTimestamp()
              .setTitle(slowed)
              .setDescription(
                `Wait **${client.function.timer(
                  time_left
                )}** to use the command again!\nThe default cooldown is **${client.function.timer(
                  path.timeout
                )}**`
              ),
          ],
        });
        setTimeout(function () {
          msg.delete();
        }, 10000);
      }
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
client.on("messageCreate", async message => {
  const p = await client.prefix(message);
  if (
    message.channel.type === "DM" &&
    !message.content.startsWith(p) &&
    !message.author.bot
  ) {
    if (message.attachments) {
      if (message.attachments && message.content) {
        message.attachments.map(e =>
          client.channels.cache.get(client.DMLog).send({
            content: `\`${message.author.tag}(${message.author.id})\`: ${
              message.content + e.url
            }`,
          })
        );
      } else {
        message.attachments.map(e =>
          client.channels.cache.get(client.DMLog).send({
            content: `\`${message.author.tag}(${message.author.id})\`: ${e.url}`,
          })
        );
      }
    } else {
      client.channels.cache.get(client.DMLog).send({
        content: `\`${message.author.tag}(${message.author.id})\`: ${message.content}`,
      });
    }
  }
});
