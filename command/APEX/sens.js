const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "sensitivity",
  description: "Get the perfect sensitivity for APEXM",
  category: "APEX",
  usage: "[Ironsight Sensitivity]",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "base_sensitivity",
      description: "Enter the base ironsight sensitivity or for 1x scope",
      required: true,
    },
  ],
  run: async (client, interaction, args) => {
    if (args[0] > 0 && args[0] < 300) {
      const embed = new MessageEmbed()
        .setTitle(`The base sensitivity (ironsight or 1x Scope): ${args[0]}`)
        .setDescription(
          `<:nyx_description:897379659665264650> [Video guide](https://rebrand.ly/apexm-sens) by HawksNest on how to set your sensitivity.
            \n**Basic Sensitivity** \`\`\`
            \nTPP without ADS ${args[0] * 2.09}
            \nFPP without ADS ${args[0] * 1.29}
            \`\`\`\n
            **Scope Sensitivity**`
        )
        .setColor(13703714) // hex: #d11a22
        .setFooter({
          text: `Data by Hawksnest`,
          iconURL:
            "https://media.discordapp.net/attachments/851764525623672854/951532817647542342/more_hawksnest.jpg",
        })
        .setTimestamp()
        .addFields(
          {
            name: "2x Scope ADS",
            value: `\`\`\`\n${args[0] * 0.5}\`\`\``,
            inline: true,
          },
          {
            name: "3x Scope ADS",
            value: `\`\`\`\n${args[0] * 0.33}\`\`\``,
            inline: true,
          },
          {
            name: "4x Scope ADS",
            value: `${args[0] * 0.25}`,
            inline: true,
          },
          {
            name: "6x Scope ADS",
            value: `${args[0] * 0.16}`,
            inline: true,
          },
          {
            name: "8x Scope ADS",
            value: `${args[0] * 0.12}`,
            inline: true,
          },
          {
            name: "10x Scope ADS",
            value: `${args[0] * 0.1}`,
            inline: true,
          }
        )
        .setURL("https://hawksnestgg.wixsite.com/apexsens/apexsenscalc");
      interaction.followUp({
        embeds: [embed],
      });
    } else {
      const embed = new MessageEmbed()
        .setDescription(`⚠ **ERROR:** The Sensitivity can be betweeen 0 & 300`)
        .setColor(client.color);
      interaction.followUp({ embeds: [embed] });
    }
  },
};
