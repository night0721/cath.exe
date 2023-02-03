const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "premiumserver",
  category: "Config",
  description: "Add premium to a server",
  Premium: true,
  options: [
    {
      type: 5,
      name: "choice",
      description: "Whether add or remove premium server",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    try {
      const user = await client.data.getUser(interaction.user.id);
      const guild = await client.data.getGuild(interaction.guild.id);
      if (interaction.options.getBoolean("choice") == true) {
        if (guild.Premium == true) {
          interaction.followUp({ content: "This server is already premium" });
        }
        if (
          (user.Tier == 1 && user.PremiumServers.length >= 5) ||
          (user.Tier == 2 && user.PremiumServers.length >= 2) ||
          (user.Tier == 3 && user.PremiumServers.length >= 0)
        ) {
          interaction.followUp({
            content:
              "You have already reached the maximum amount of premium servers",
          });
        } else {
          await client.data.setPremium(interaction.guild.id, "true");
          await client.data.pushGuild(
            interaction.user.id,
            interaction.guild.id,
            "push"
          );
          interaction.followUp({
            embeds: [
              new EmbedBuilder()
                .setTitle("Success!")
                .setDescription(
                  `Premium added to **${interaction.guild.name}**! \n`
                )
                .setFooter({ text: "Thank you for supporting Cath!" })
                .setColor("Green")
                .setTimestamp()
                .setAuthor(
                  interaction.user.tag,
                  interaction.user.displayAvatarURL({ dynamic: true })
                ),
            ],
          });
          client.channels.cache.get(client.config.ServerLog).send({
            embeds: [
              new EmbedBuilder()
                .setTitle("New Premium Server")
                .addField(
                  "Server Info",
                  `**>Server Name**: \n${interaction.guild.name}
                  **>Server ID**: \n${interaction.guild.id}
                  **>Server Member Count**: \n${interaction.guild.memberCount}`
                )
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setColor("Green"),
            ],
          });
        }
      } else {
        if (guild.Premium == false) {
          interaction.followUp({ content: "This server isn't premium yet" });
        }
        if (!user.PremiumServers.includes(interaction.guild.id)) {
          interaction.followUp({
            content:
              "You can't remove due to you aren't the person who made the server premium",
          });
        } else {
          await client.data.setPremium(interaction.guild.id, "false");
          await client.data.pushGuild(
            interaction.user.id,
            interaction.guild.id,
            "splice"
          );
          interaction.followUp({
            embeds: [
              new EmbedBuilder()
                .setTitle("Removed!")
                .setDescription(
                  `Premium removed from **${interaction.guild.name}**! \n`
                )
                .setColor("RED")
                .setTimestamp()
                .setAuthor(
                  interaction.user.tag,
                  interaction.user.displayAvatarURL({ dynamic: true })
                ),
            ],
          });
          client.channels.cache.get(client.config.ServerLog).send({
            embeds: [
              new EmbedBuilder()
                .setTitle("Premium Server Removed")
                .addField(
                  "Server Info",
                  `**>Server Name**: \n${interaction.guild.name}
                  **>Server ID**: \n${interaction.guild.id}
                  **>Server Member Count**: \n${interaction.guild.memberCount}`
                )
                .setTimestamp()
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setColor("RED"),
            ],
          });
        }
      }
    } catch (e) {
      console.log(e);
      interaction.followUp({ content: `**Error**: ${e.message}` });
    }
  },
};
