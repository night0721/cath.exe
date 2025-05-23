const client = require("../");
const cooldown = require("../models/cooldown");
const utils = require("../util/functions/function");
const { EmbedBuilder } = require("discord.js");
client.on("interactionCreate", async interaction => {
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return;
    const args = [];
    for (const option of interaction.options.data) {
      if (option.type === 2) {
        if (option.name) args.push(option.name);
        option.options?.forEach(x => {
          if (x.type === 1) {
            if (x.name) args.push(x.name);
            x.options?.forEach(y => {
              if (y.value) args.push(y.value);
            });
          } else if (x.value) {
            args.push(x.value);
          }
          if (x.value) args.push(x.value);
        });
      }
      if (option.type === 1) {
        if (option.name) args.push(option.name);
        option.options?.forEach(x => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) {
        args.push(option.value);
      }
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    const data = {};
    const guildDB = await client.data.getGuild(interaction.guild.id);
    if (!guildDB) return;
    const userDB = await client.data.getUser(interaction.user.id);
    if (!userDB) return;
    data.Guild = guildDB;
    data.User = userDB;
    if (!guildDB) await client.data.CreateGuild(interaction.guild.id);
    if (data.User?.Blacklist)
      return interaction.followUp({
        content:
          "You have been blacklisted from the bot, please contact the developers to appeal",
      });
    if (cmd.Owner && !client.owners.includes(interaction.user.id)) return;
    if (cmd.Premium && !data.User.Premium) {
      return interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setURL(client.web)
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setColor(client.color)
            .setDescription(
              `You aren't a premium user. You can either boost support server or subscribe to developer's team [Ko-fi](https://ko-fi.com/cathteam) or gift a nitro to one of the developer team to be premium user`
            )
            .setTimestamp()
            .setFooter({
              text: `Made by ${client.author}`,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            }),
        ],
      });
    }
    if (data.Guild?.Category) {
      if (data.Guild.Category.includes(cmd.directory)) {
        return interaction.followUp({
          content: "This command has been disabled in this server",
        });
      }
    }
    if (data.Guild?.Commands) {
      if (data.Guild.Commands.includes(cmd.name)) {
        return interaction.followUp({
          content: "This command has been disabled in this server",
        });
      }
    }

    if (cmd.timeout) {
      const current_time = Date.now();
      const cooldown_amount = cmd.timeout;
      cooldown.findOne(
        { User: interaction.user.id, CMD: cmd.name },
        async (er, d) => {
          if (d) {
            const expiration_time = d.Time + cooldown_amount;
            if (current_time < expiration_time) {
              if (data.Guild.Tips) utils.tips(interaction, client);
              utils.cooldown(d.Time, cooldown_amount, interaction);
            } else {
              if (data.Guild.Tips) utils.tips(interaction, client);
              await cooldown.findOneAndUpdate(
                { User: interaction.user.id, CMD: cmd.name },
                { Time: current_time }
              );
              cmd
                .run(client, interaction, args, utils, data)
                .catch(e => sendE(e, interaction));
              client.channels.cache.get(client.config.CMDLog).send({
                content: `\`${interaction.user.tag}(${interaction.user.id})\`\n has used \n**${cmd.name}**\n command in \n\`${interaction.guild.name}(${interaction.guild.id})\``,
              });
            }
          } else {
            if (data.Guild.Tips) utils.tips(interaction, client);
            cmd
              .run(client, interaction, args, utils, data)
              .catch(e => sendE(e, interaction));
            client.channels.cache.get(client.config.CMDLog).send({
              content: `\`${interaction.user.tag}(${interaction.user.id})\`\n has used \n**${cmd.name}**\n command in \n\`${interaction.guild.name}(${interaction.guild.id})\``,
            });
            new cooldown({
              User: interaction.user.id,
              CMD: cmd.name,
              Time: current_time,
              Cooldown: cmd.timeout,
            }).save();
          }
        }
      );
    } else {
      if (data.Guild.Tips) utils.tips(interaction, client);
      cmd
        .run(client, interaction, args, utils, data)
        .catch(e => sendE(e, interaction));
      client.channels.cache.get(client.config.CMDLog).send({
        content: `\`${interaction.user.tag}(${interaction.user.id})\`\n has used \n**${cmd.name}**\n command in \n\`${interaction.guild.name}(${interaction.guild.id})\``,
      });
    }
  }
  if (interaction.isContextMenuCommand()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});
client.on("interactionCreate", async interaction => {
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const ownercmd = client.hide.get(interaction.commandName);
    if (!ownercmd) return;
    const args = [];
    for (const option of interaction.options.data) {
      if (option.type === 1) {
        if (option.name) args.push(option.name);
        option.options?.forEach(x => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) {
        args.push(option.value);
      }
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    ownercmd
      .run(client, interaction, args, utils)
      .catch(e => sendE(e, interaction));
    client.channels.cache.get(client.config.CMDLog).send({
      content: `\`${interaction.user.tag}(${interaction.user.id})\`\n has used \n**${ownercmd.name}**\n command in \n\`${interaction.guild.name}(${interaction.guild.id})\``,
    });
  }
});
function sendE(e, i) {
  console.error(e.stack);
  const embed = new EmbedBuilder()
    .setTitle("Command Error")
    .setDescription(`\`\`\`yaml\n${e.stack}\`\`\``)
    .setTimestamp()
    .setColor(client.color)
    .setFooter({ text: client.user.username });
  i.channel.send({ embeds: [embed] });
  client.channels.cache.get(client.config.ErrorLog).send({ embeds: [embed] });
}
