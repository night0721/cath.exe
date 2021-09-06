const { CommandInteracion, Client, MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "roleinfo",
  description: "Get information of a role",
  category: "Infromation",
  options: [
    {
      name: "role",
      type: "ROLE",
      description: "The role you want to see",
      required: true,
    },
  ],
  type: "CHAT_INPUT",
  /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args, utils) => {
    const role = interaction.guild.roles.cache.get(args[0]);
    const position = `\`${
      interaction.guild.roles.cache.size - role.position
    }\`/\`${interaction.guild.roles.cache.size}\``;
    const embed = new MessageEmbed()
      .setTimestamp()
      .setURL(client.web)
      .setAuthor(
        interaction.member.nickname,
        interaction.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle("Role Info")
      .setFooter(`Made by ${client.author}`)
      .setColor(role.color)
      .addFields(
        {
          name: "ID",
          value: role.id,
        },
        {
          name: "Name",
          value: role.name,
          inline: true,
        },
        {
          name: "Color",
          value: role.hexColor,
          inline: true,
        },
        {
          name: "Position",
          value: position,
          inline: true,
        },
        {
          name: `Hoisted`,
          value: `${role.hoist ? "Yes" : "No"}`,
          inline: true,
        },
        {
          name: "Mentionable",
          value: `${role.mentionable ? "Yes" : "No"}`,
          inline: true,
        },
        {
          name: "Bot Role",
          value: `${role.managed ? "Yes" : "No"}`,
          inline: true,
        },
        {
          name: "Creation Date",
          value: `\`${moment(role.createdAt).format("DD/MMM/YYYY")}\``,
          inline: true,
        },
        {
          name: "Permissions",
          value: utils.fixPermissions(role.permissions.toArray()),
          inline: true,
        }
      );
    await interaction.followUp({ embeds: [embed] });
  },
};
