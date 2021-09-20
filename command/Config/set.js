const starboardClient = require("../../client/StarboardClient");
module.exports = {
  name: "set",
  description: "Configure settings for the server",
  UserPerms: ["ADMINISTRATOR"],
  category: "Config",
  options: [
    {
      type: 1,
      name: "muterole",
      description: "Set mute role for the server",
      options: [
        {
          type: 8,
          name: "role",
          description: "The role for muted users",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "prefix",
      description: "Set prefix for the server",
      options: [
        {
          type: 3,
          name: "prefix",
          description: "The prefix for the server",
          required: true,
          choices: [],
        },
      ],
    },
    {
      type: 1,
      name: "welcome",
      description: "Set welcome channel for the server",
      options: [
        {
          type: 7,
          name: "channel",
          description: "The channel for welcome messages",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "goodbye",
      description: "Set goodbye channel for the server",
      options: [
        {
          type: 7,
          name: "channel",
          description: "The channel for goodbye messages",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "starboard",
      description: "Set starboard channel for the server",
      options: [
        {
          type: 7,
          name: "channel",
          description: "The channel for starboard messages",
          required: true,
        },
        {
          type: 4,
          name: "starcount",
          description: "The required amount of star to trigger the starboard",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "chatbot",
      description: "Set chatbot channel for the server",
      options: [
        {
          type: 7,
          name: "channel",
          description: "The channel for chatbot messages",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "log",
      description: "Set log channel for the server",
      options: [
        {
          type: 7,
          name: "channel",
          description: "The channel for log messages",
          required: true,
        },
      ],
    },
    {
      type: 1,
      name: "level",
      description: "Set whether level system is activated for the server",
      options: [
        {
          type: 5,
          name: "choice",
          description: "whether level system is activated for the server",
          required: true,
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    if (args[0].toLowerCase() === "muterole") {
      const role = interaction.guild.roles.cache.get(args[1]);
      if (role.managed) {
        interaction.followUp({ content: "You must provide a non bot role" });
      } else {
        await client.data.setMuterole(interaction.guild.id, args[1]);
        interaction.followUp({
          content: `Saved **${role.name}** as the mute role`,
        });
      }
    } else if (args[0].toLowerCase() === "prefix") {
      await client.data.setPrefix(interaction.guild.id, args[1]);
      interaction.followUp({ content: `Saved \`${args[1]}\` as the prefix` });
    } else if (args[0].toLowerCase() === "welcome") {
      const channel = interaction.guild.channels.cache.get(args[1]);
      if (channel.type !== "GUILD_TEXT")
        interaction.followUp({ content: "Please provide a text channel" });
      else {
        await client.data.setWelcome(interaction.guild.id, args[1]);
        interaction.followUp({
          content: `Saved **${channel}** as the welcome channel`,
        });
      }
    } else if (args[0].toLowerCase() === "goodbye") {
      const channel = interaction.guild.channels.cache.get(args[1]);
      if (channel.type !== "GUILD_TEXT")
        interaction.followUp({ content: "Please provide a text channel" });
      else {
        await client.data.setGoodbye(interaction.guild.id, args[1]);
        interaction.followUp({
          content: `Saved **${channel}** as the goodbye channel`,
        });
      }
    } else if (args[0].toLowerCase() === "starboard") {
      const channel = interaction.guild.channels.cache.get(args[1]);
      if (channel.type !== "GUILD_TEXT")
        interaction.followUp({ content: "Please provide a text channel" });
      else {
        starboardClient.config.guilds.add({
          id: interaction.guild.id,
          options: {
            starCount: args[2],
            starboardChannel: args[1],
          },
        });
        await client.data.setStarboard(interaction.guild.id, args[1], args[2]);
        interaction.followUp({
          content: `Saved **${channel}** as the starboard channel`,
        });
      }
    } else if (args[0].toLowerCase() === "chatbot") {
      const channel = interaction.guild.channels.cache.get(args[1]);
      if (channel.type !== "GUILD_TEXT")
        interaction.followUp({ content: "Please provide a text channel" });
      else {
        await client.data.setChatbot(interaction.guild.id, args[1]);
        interaction.followUp({
          content: `Saved **${channel}** as the chatbot channel`,
        });
      }
    } else if (args[0].toLowerCase() === "log") {
      const channel = interaction.guild.channels.cache.get(args[1]);
      if (channel.type !== "GUILD_TEXT")
        interaction.followUp({ content: "Please provide a text channel" });
      else {
        let webhookid;
        let webhooktoken;
        await channel
          .createWebhook(interaction.guild.name, {
            avatar: interaction.guild.iconURL({ format: "png" }),
          })
          .then(webhook => {
            webhookid = webhook.id;
            webhooktoken = webhook.token;
          });
        await client.data.setLog(
          interaction.guild.id,
          channel.id,
          webhookid,
          webhooktoken
        );
        interaction.followUp({
          content: `Saved **${channel}** as the log channel`,
        });
      }
    } else if (args[0].toLowerCase() === "level") {
      if (args[1]) {
        await client.data.setGLevel(interaction.guild.id, "true");
        interaction.followUp({
          content: `Levelling is enabled in this server now.`,
        });
      } else {
        await client.data.setGLevel(interaction.guild.id, "false");
        interaction.followUp({
          content: `Levelling is disabled in this server now.`,
        });
      }
    }
  },
};
