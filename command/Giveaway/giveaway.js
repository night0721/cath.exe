const GiveawaysClient = require("../../client/GiveawaysClient");
module.exports = {
  name: "giveaway",
  description: "Giveaway",
  UserPerms: ["MANAGE_MESSAGES"],
  options: [
    {
      type: "SUB_COMMAND",
      name: "start",
      description: "Start a giveaway",
      options: [
        {
          type: 3,
          name: "prize",
          description: "The prize of the giveaway",
          required: true,
          choices: [],
        },
        {
          type: 4,
          name: "winners",
          description: "The amount of winners of the giveaway",
          required: true,
        },
        {
          type: 3,
          name: "time",
          description: "The amount of time of the giveaway",
          required: true,
        },
        {
          type: 7,
          name: "channel",
          description: "The channel of the giveaway",
          required: true,
          channelTypes: ["GUILD_TEXT"],
        },
        {
          type: 8,
          name: "role1",
          description: "The required role to join the giveaway",
        },
        {
          type: 8,
          name: "role2",
          description: "The required role to join the giveaway",
        },
        {
          type: 8,
          name: "role3",
          description: "The required role to join the giveaway",
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "reroll",
      description: "Reroll a giveaway",
      options: [
        {
          type: 3,
          name: "message",
          description: "The message ID of the giveaway",
          required: true,
          choices: [],
        },
      ],
    },
    {
      type: "SUB_COMMAND",
      name: "end",
      description: "End a giveaway",
      options: [
        {
          type: 3,
          name: "message",
          description: "The message ID of the giveaway",
          required: true,
          choices: [],
        },
      ],
    },
  ],
  run: async (client, interaction, args, utils) => {
    if (args[0] == "start") {
      const [, prize, winners, time, channel, roles1, roles2, roles3] = args;
      if (!utils.ms(time)) {
        interaction.followUp({
          content: "Time must be a valid time to parse (Example: 10m, 100s)",
        });
      }
      await GiveawaysClient.create(client, {
        prize,
        host: interaction.user.id,
        winners,
        endAfter: time,
        requirements: roles1
          ? {
              Enabled: true,
              Roles: [roles1],
            }
          : roles2 && roles1
          ? {
              Enabled: true,
              Roles: [roles1, roles2],
            }
          : roles1 && roles2 && roles3
          ? {
              Enabled: true,
              Roles: [roles1, roles2, roles3],
            }
          : { Enabled: false },
        Channel: channel,
      });
      interaction.followUp({
        content: `Giveaway is started in ${interaction.guild.channels.cache.get(
          channel
        )}`,
      });
    } else if (args[0] == "reroll") {
      const giveaway = await GiveawaysClient.getByMessage(args[1]);
      const m = await client.guilds.cache
        .get(giveaway.Guild)
        .channels.cache.get(giveaway.Channel)
        .messages.fetch(args[1]);
      if (!m) {
        interaction.followUp({ content: "Unable to find the giveaway ⚠" });
      } else {
        await GiveawaysClient.end(m, giveaway, m);
      }
    } else {
      const giveaway = await GiveawaysClient.getByMessage(args[1]);
      const m = await client.guilds.cache
        .get(giveaway.Guild)
        .channels.cache.get(giveaway.Channel)
        .messages.fetch(args[1]);
      if (!m) {
        interaction.followUp({ content: "Unable to find the giveaway ⚠" });
      } else {
        await GiveawaysClient.end(m, giveaway, m);
      }
    }
  },
};
