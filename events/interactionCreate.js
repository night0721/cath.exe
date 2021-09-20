const client = require("../bot");
const utils = require("../util/functions/function");
const codmclient = require("../client/CODMClient");
client.on("interactionCreate", async interaction => {
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return;
    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach(x => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    const data = {};
    let guildDB = await client.data.getGuild(interaction.guild.id);
    if (!guildDB) return;
    let userDB = await client.data.getUser(interaction.user.id);
    if (!userDB) return;
    let userEconDB = await client.data.getUserEcon(interaction.user.id);
    data.Guild = guildDB;
    data.User = userDB;
    data.UserEcon = userEconDB;
    if (!guildDB) await client.data.CreateGuild(interaction.guild.id);
    if (!userEconDB) await client.createProfile(interaction.user.id);
    try {
      if (data.User) {
        if (data.User.Blacklist)
          return interaction.followUp({
            content:
              "You have been blacklisted from the bot, please contact the developers to appeal",
          });
      }
      if (cmd.Owner) {
        if (!client.owners.includes(interaction.user.id)) return;
      }
      if (cmd.Premium) {
        if (!data.User.Premium) {
          return interaction.followUp({
            embeds: [
              new MessageEmbed()
                .setURL(client.web)
                .setAuthor(
                  interaction.user.tag,
                  interaction.user.displayAvatarURL({ dynamic: true })
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
      if (cmd.Level) {
        if (!data.Guild.Level) return;
      }
      if (!interaction.guild.me.permissions.has(cmd.BotPerms || []))
        return interaction.followUp({
          content: `You can't use this command. I need to have ${cmd.BotPerms} permission to use this command.`,
        });
      if (!interaction.member.permissions.has(cmd.userPerms || []))
        return interaction.followUp({
          content: `You can't use this command. I need to have ${cmd.UserPerms} permission to use this command.`,
        });
      if (data.Guild) {
        if (data.Guild.Category) {
          if (data.Guild.Category.includes(cmd.directory)) return;
        }
        if (data.Guild.Commands) {
          if (data.Guild.Commands.includes(cmd.name)) return;
        }
      }
      cmd.run(client, interaction, args, utils, codmclient);
      client.channels.cache.get(client.CMDLog).send({
        content: `\`${interaction.user.tag}(${interaction.user.id})\`\n has used \n**${cmd.name}**\n command in \n\`${interaction.guild.name}(${interaction.guild.id})\``,
      });
      client.addcmdsused(interaction.user.id);
    } catch (e) {
      console.log(e);
    }
  }
  if (interaction.isContextMenu()) {
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
    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach(x => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    try {
      ownercmd.run(client, interaction, args, utils, codmclient);
      client.channels.cache.get(client.CMDLog).send({
        content: `\`${interaction.user.tag}(${interaction.user.id})\`\n has used \n**${ownercmd.name}**\n command in \n\`${interaction.guild.name}(${interaction.guild.id})\``,
      });
      client.addcmdsused(interaction.user.id);
    } catch (e) {
      console.log(e);
    }
  }
});
