const client = require("../bot");
const utils = require("../util/functions/function");
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
    if (!interaction.member.permissions.has(cmd.userPerms || []))
      return await interaction.followUp({ content: "no perm" });
    try {
      cmd.run(client, interaction, args, utils);
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
    if (!interaction.member.permissions.has(ownercmd.userPerms || []))
      return await interaction.followUp({ content: "no perm" });
    try {
      ownercmd.run(client, interaction, args, utils);
      client.channels.cache.get(client.CMDLog).send({
        content: `\`${interaction.user.tag}(${interaction.user.id})\`\n has used \n**${ownercmd.name}**\n command in \n\`${interaction.guild.name}(${interaction.guild.id})\``,
      });
      client.addcmdsused(interaction.user.id);
    } catch (e) {
      console.log(e);
    }
  }
});
