const client = require("../bot");
const Schema = require("../models/reaction");

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  Schema.findOne({ Message: reaction.message.id }, async (err, data) => {
    if (!data) return;
    if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return;
    const [roleid] = data.Roles[reaction.emoji.name];
    reaction.message.guild.members.cache.get(user.id).roles.add(roleid);
    user.send(`A role has been added`);
  });
});
client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  Schema.findOne({ Message: reaction.message.id }, async (err, data) => {
    if (!data) return;
    if (!Object.keys(data.Roles).includes(reaction.emoji.name)) return;

    const [roleid] = data.Roles[reaction.emoji.name];
    reaction.message.guild.members.cache.get(user.id).roles.remove(roleid);
    user.send(`A role has been removed`);
  });
});
