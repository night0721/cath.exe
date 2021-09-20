const client = require("../bot");
const codmclient = require("../client/CODMClient");
const leven = require("leven");
const { MessageEmbed } = require("discord.js");
const cooldown = require("../models/cooldown");
const utils = require("../util/functions/function");
client.on("messageCreate", async message => {
  const p = await client.prefix(message);
  if (message.author.bot || !message.guild) return;
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
  if (p) {
    if (!message.content.toLowerCase().startsWith(p.toLowerCase())) return;
  }
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
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
    if (data.User.Blacklist) return;
  }
  const [cmd, ...args] = message.content.slice(p.length).trim().split(/ +/g);
  if (cmd.length == 0) return;
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
    if (dym === "") {
      return;
    } else {
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
  } else {
    if (command.Owner) {
      if (!client.owners.includes(message.author.id)) return;
    }
    if (command.Premium) {
      if (!data.User.Premium) {
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
                `You aren't a premium user. You can either boost support server or subscribe to developer's team [Ko-fi](https://ko-fi.com/cathteam) or gift a nitro to one of the developer team to be premium user`
              )
              .setTimestamp()
              .setFooter(`Made by ${client.author}`),
          ],
        });
      }
    }
    if (command.Level) {
      if (!data.Guild.Level) return;
    }
    if (!message.guild.me.permissions.has(command.BotPerm || []))
      return message.reply({
        content: `You can't use this command. I need to have ${command.BotPerm} permission to use this command.`,
      });
    if (data.Guild) {
      if (data.Guild.Category) {
        if (data.Guild.Category.includes(command.directory)) return;
      }
      if (data.Guild.Commands) {
        if (data.Guild.Commands.includes(command.name)) return;
      }
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
              utils.cooldown(data.Time, cooldown_amount, message);
            } else {
              await cooldown.findOneAndUpdate(
                { User: message.author.id, CMD: command.name },
                { Time: current_time }
              );
              command.run(client, message, args, utils, data, codmclient);
              client.addcmdsused(message.author.id);
              client.channels.cache.get(client.CMDLog).send({
                content: `\`${message.author.tag}(${message.author.id})\`\n has used \n**${command.name}**\n command in \n\`${message.guild.name}(${message.guild.id})\``,
              });
            }
          } else {
            command.run(client, message, args, utils, data, codmclient);
            client.channels.cache.get(client.CMDLog).send({
              content: `\`${message.author.tag}(${message.author.id})\`\n has used \n**${command.name}**\n command in \n\`${message.guild.name}(${message.guild.id})\``,
            });
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
      try {
        command.run(client, message, args, utils, data, codmclient);
        client.channels.cache.get(client.CMDLog).send({
          content: `\`${message.author.tag}(${message.author.id})\`\n has used \n**${command.name}**\n command in \n\`${message.guild.name}(${message.guild.id})\``,
        });
        client.addcmdsused(message.author.id);
      } catch (e) {
        console.log(e);
      }
    }
  }
});
client.on("messageCreate", async message => {
  const p = await client.prefix(message);
  if (message.author.bot) return;
  if (!message.content.startsWith(p)) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const [cmd, ...args] = message.content.slice(p.length).trim().split(/ +/g);
  if (cmd.length == 0) return;
  let path = client.hide.get(cmd);
  if (path) {
    if (!client.path.includes(message.guild.id)) return;
    try {
      path.run(client, message, args);
      client.addcmdsused(message.author.id);
      client.channels.cache.get(client.CMDLog).send({
        content: `\`${message.author.tag}(${message.author.id})\`\n has used \n**${path.name}**\n command in \n\`${message.guild.name}(${message.guild.id})\``,
      });
    } catch (e) {
      console.log(e);
    }
  }
});
client.on("messageCreate", async message => {
  if (message.channel.type === "DM" && !message.author.bot) {
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
