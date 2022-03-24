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
    if (args[0] > 0 && args[0] < 301) {
      const embed = new MessageEmbed()
        .setTitle(`Apex Legends Mobile Sensitivity Calculator`)
        .setDescription(
          `<:nyx_description:897379659665264650> For more info, follow this [Video guide](https://rebrand.ly/apexm-sens) by HawksNest.`
        )
        .setColor(13703714) // hex: #d11a22
        .setFooter({
          text: `Data by Hawksnest`,
          iconURL:
            "https://media.discordapp.net/attachments/851764525623672854/951532817647542342/more_hawksnest.jpg",
        })
        .setTimestamp()
        .addField(
          {
            name: "Basic Sensitivity",
            value: `
            For Base Sensitivity (ironsight or 1x Scope): ${args[0]}\n
            TPP without ADS ${args[0] * 2.09}
            FPP without ADS ${args[0] * 1.29}`,
            inline: false,
          },
          {
            name: "Scope Sensitivity",
            value: `
            2x Scope ADS  - \`${args[0] * 0.5}\`
            3x Scope ADS  - \`${args[0] * 0.33}\`            
            4x Scope ADS  - \`${args[0] * 0.25}\`
            6x Scope ADS  - \`${args[0] * 0.16}\`
            8x Scope ADS  - \`${args[0] * 0.12}\`
            10x Scope ADS - \`${args[0] * 0.1}\``,
            inline: false,
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
