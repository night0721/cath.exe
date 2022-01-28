const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    category: "SUB_COMMAND",
    description: 'Creates a poll with many options',
        options: [
        {
            name: 'create',
            description: 'Creates An Interactive Poll',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'question',
                    description: 'The question of the poll',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'choice1',
                    description: 'Choice 1',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'choice2',
                    description: 'Choice 2',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'choice3',
                    description: 'Choice 3',
                    type: 'STRING',
                    required: false,
                },
                {
                    name: 'choice4',
                    description: 'Choice 4',
                    type: 'STRING',
                    required: false,
                },
                {
                    name: 'choice5',
                    description: 'Choice 5',
                    type: 'STRING',
                    required: false,
                },
                {
                    name: 'choice6',
                    description: 'Choice 6',
                    type: 'STRING',
                    required: false,
                },
            ],
        },
    ],
        /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction  
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        if (interaction.options.getSubcommand() == 'create') {
          const title = interaction.options.getString('question')
           const c1 = interaction.options.getString('choice1');
           const c2 = interaction.options.getString('choice2');
           const c3 = interaction.options.getString('choice3');
           const c4 = interaction.options.getString('choice4');
           const c5 = interaction.options.getString('choice5');
           const c6 = interaction.options.getString('choice6');
            const pollCreateEmbed = new MessageEmbed()
                .setTitle(`${title}`)
                .setColor("RED")
                .addFields(
                    { name: "⠀", value: `🇦 ${c1}`},
                    { name: "⠀", value: `🇧 ${c2}`}
                )
                .setFooter(`Poll By ${interaction.user.tag}`)
                .setTimestamp();
              

            if (interaction.options.getString('choice3')) {
                pollCreateEmbed.addFields({ name: "⠀", value: `🇨 ${c3}`});
            }
            if (interaction.options.getString('choice4')) {
                pollCreateEmbed.addFields({ name: "⠀", value: `🇩 ${c4}`});
            }
            if (interaction.options.getString('choice5')) {
                pollCreateEmbed.addFields({ name: "⠀", value: `🇪 ${c5}`});
            }
            if (interaction.options.getString('choice6')) {
                pollCreateEmbed.addFields({ name: "⠀", value: `🇫 ${c6}`});
            }

            embedMessage = await interaction.followUp({
                embeds: [pollCreateEmbed],
                //fetchReply: true,
            });
            embedMessage.react('🇦');
            embedMessage.react('🇧');

            if (interaction.options.getString('choice3')) {  
                embedMessage.react('🇨');
            }
            if (interaction.options.getString('choice4')) {
                embedMessage.react('🇩');
            }
            if (interaction.options.getString('choice5')) {
                embedMessage.react('🇪');
            }
            if (interaction.options.getString('choice6')) {
                embedMessage.react('🇫');
            }
        } else {
            return;
        }
    },
};
