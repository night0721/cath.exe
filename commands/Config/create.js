const Discord = require("discord.js");
const db = require("../../models/custom-commands");

module.exports = {
  name: "cc-create",
  UserPerm: "ADMINISTRATOR",
  description: "Crate custom commands for a server",
  category: "Config",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    message.delete();
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Setup | 1/3`)
        .setDescription(
          "What is the name of the command?\nYou can cancel the setup at any time by sending `cancel`."
        )
        .setColor(client.color)
    );
    await startMessageCollectors(client, message, args);
    function startMessageCollectors(client, message, args) {
      let nameFilter = m => m.author.id === message.author.id;
      let nameCollector = new Discord.MessageCollector(
        message.channel,
        nameFilter,
        { max: 999 }
      );
      nameCollector.on("collect", async msg => {
        let name = msg.content.toLowerCase();
        const data = await db.findOne({
          Guild: message.guild.id,
          Command: name,
        });
        if (data) {
          nameCollector.stop();
          return message.inlineReply("This command has already exist.");
        }
        if (name === "cancel") {
          msg.channel.send("The setup has been cancelled.");
          db.findOneAndDelete({ Guild: message.guild.id, Command: name });
          nameCollector.stop();
          return;
        }
        if (!name) {
          await msg.channel.send("You don't specify a name. Cancelled setup.");
          nameCollector.stop();
          return;
        } else {
          const newDB = new db({
            Guild: message.guild.id,
            Command: name,
          });
          await newDB.save();
          console.log(newDB);
          msg.channel.send(
            new Discord.MessageEmbed()
              .setTitle(`Setup | 2/3`)
              .setDescription(
                `The command name will be **${name}**.\nWhat is the response for the command? You can have mutliple response by joning them with differnt lines.`
              )
              .setColor(client.color)
          );
          nameCollector.stop();
        }
        let responseFilter = m => m.author.id === message.author.id;
        let responseCollector = new Discord.MessageCollector(
          message.channel,
          responseFilter,
          { max: 999 }
        );
        responseCollector.on("collect", async msg => {
          let response = msg.content.split("\n");
          console.log(`Response: ${response}`);

          if (msg.content.toLowerCase() === "cancel") {
            msg.channel.send("The setup has been cancelled.");
            responseCollector.stop();
            return;
          }
          if (!response) {
            msg.channel.send(`You didn't specify a response. Setup cancelled.`);
            responseCollector.stop();
          }
          if (response.length > 1) {
            responseCollector.stop();
            await db.findOne(
              { Guild: message.guild.id, Command: name },
              async (err, data) => {
                if (data) {
                  data.Response = response;
                  await db.findOneAndUpdate(
                    { Guild: message.guild.id, Command: name },
                    data
                  );
                  console.log(data);
                }
              }
            );
            msg.channel.send(
              new Discord.MessageEmbed()
                .setTitle(`Setup | 3/4`)
                .setColor(client.color)
                .setDescription(
                  `Ok so there will be ${response.length} responses. Do you want the response be randomized?\n\`Type yes or no\` \nIf you choose no, accumlative responses may let the command can\'t be sent out.`
                )
            );
            let randomFilter = m => m.author.id === message.author.id;
            let randomCollector = new Discord.MessageCollector(
              message.channel,
              randomFilter,
              { max: 999 }
            );
            randomCollector.on("collect", async msg => {
              let maybe;
              if (msg.content.toLowerCase() === "yes") {
                msg.channel.send(
                  new Discord.MessageEmbed()
                    .setColor(client.color)
                    .setTitle(`Setup | 4/4`)
                    .setDescription(
                      `The responses will be randomized. Do you want to have delete command usage? \`Type yes or no\``
                    )
                );
                randomCollector.stop();
                maybe = true;
                await db.findOne(
                  {
                    Guild: message.guild.id,
                    Response: response,
                    Command: name,
                  },
                  async (err, data) => {
                    if (data) {
                      data.Random = maybe;
                      await db.findOneAndUpdate(
                        {
                          Guild: message.guild.id,
                          Command: name,
                          Response: response,
                        },
                        data
                      );
                      console.log(data);
                    }
                  }
                );
                console.log(`Random: ${maybe}`);
                let deleteeeFilter = m => m.author.id === message.author.id;
                let deleteeeCollector = new Discord.MessageCollector(
                  message.channel,
                  deleteeeFilter,
                  { max: 999 }
                );
                deleteeeCollector.on("collect", async msg => {
                  let idkwor;
                  if (msg.content.toLowerCase() === "yes") {
                    deleteeeCollector.stop();
                    idkwor = true;
                    await db.findOne(
                      {
                        Guild: message.guild.id,
                        Command: name,
                        Response: response,
                        Random: maybe,
                      },
                      async (err, data) => {
                        if (data) {
                          data.Delete = idkwor;
                          await db.findOneAndUpdate(
                            {
                              Guild: message.guild.id,
                              Command: name,
                              Response: response,
                              Random: maybe,
                            },
                            data
                          );
                          console.log(data);
                          msg.inlineReply(
                            `Saved **${data.Command}** as a custom command`
                          );
                        }
                      }
                    );
                    console.log(`Usage Delete: ${idkwor}`);
                  }
                  if (msg.content.toLowerCase() === "no") {
                    deleteeeCollector.stop();
                    idkwor = false;
                    await db.findOne(
                      {
                        Guild: message.guild.id,
                        Command: name,
                        Response: response,
                        Random: maybe,
                      },
                      async (err, data) => {
                        if (data) {
                          data.Delete = idkwor;
                          await db.findOneAndUpdate(
                            {
                              Guild: message.guild.id,
                              Command: name,
                              Response: response,
                              Random: maybe,
                            },
                            data
                          );
                          console.log(data);
                          msg.inlineReply(
                            `Saved **${data.Command}** as a custom command`
                          );
                        }
                      }
                    );
                  }
                  if (msg.content.toLowerCase() === "cancel") {
                    msg.channel.send("The setup has been cancelled.");
                    deleteeeCollector.stop();
                    return;
                  }
                });
              }
              if (msg.content.toLowerCase() === "no") {
                msg.channel.send(
                  new Discord.MessageEmbed()
                    .setColor(client.color)
                    .setTitle(`Setup | 4/4`)
                    .setDescription(
                      `The responses won't be randomized. Do you want to have delete command usage? \`Type yes or no\``
                    )
                );
                randomCollector.stop();
                maybe = false;
                await db.findOne(
                  {
                    Guild: message.guild.id,
                    Command: name,
                    Response: response,
                  },
                  async (err, data) => {
                    if (data) {
                      data.Random = maybe;
                      await db.findOneAndUpdate(
                        {
                          Guild: message.guild.id,
                          Command: name,
                          Response: response,
                        },
                        data
                      );
                      console.log(data);
                    }
                  }
                );
                let deleteeFilter = m => m.author.id === message.author.id;
                let deleteeCollector = new Discord.MessageCollector(
                  message.channel,
                  deleteeFilter,
                  { max: 999 }
                );
                deleteeCollector.on("collect", async msg => {
                  let idkwor;
                  if (msg.content.toLowerCase() === "yes") {
                    deleteeCollector.stop();
                    idkwor = true;
                    await db.findOne(
                      {
                        Guild: message.guild.id,
                        Command: name,
                        Response: response,
                      },
                      async (err, data) => {
                        if (data) {
                          data.Delete = idkwor;
                          await db.findOneAndUpdate(
                            {
                              Guild: message.guild.id,
                              Command: name,
                              Response: response,
                              Random: maybe,
                            },
                            data
                          );
                          msg.inlineReply(
                            `Saved **${data.Command}** as a custom command`
                          );
                        }
                      }
                    );
                    console.log(`Usage Delete: ${idkwor}`);
                  }
                  if (msg.content.toLowerCase() === "no") {
                    deleteeCollector.stop();
                    idkwor = false;
                    await db.findOne(
                      {
                        Guild: message.guild.id,
                        Command: name,
                        Response: response,
                        Random: maybe,
                      },
                      async (err, data) => {
                        if (data) {
                          data.Delete = idkwor;
                          await db.findOneAndUpdate(
                            {
                              Guild: message.guild.id,
                              Command: name,
                              Response: response,
                            },
                            data
                          );
                          msg.inlineReply(
                            `Saved **${data.Command}** as a custom command`
                          );
                        }
                      }
                    );
                  }
                  if (msg.content.toLowerCase() === "cancel") {
                    msg.channel.send("The setup has been cancelled.");
                    deleteeCollector.stop();
                    return;
                  }
                });
              }
              if (msg.content.toLowerCase() === "cancel") {
                msg.channel.send("The setup has been cancelled.");
                randomCollector.stop();
                return;
              }
            });
          } else {
            await db.findOne(
              { Guild: message.guild.id, Command: name },
              async (err, data) => {
                if (data) {
                  data.Response = response;
                  await db.findOneAndUpdate(
                    { Guild: message.guild.id, Command: name },
                    data
                  );
                  console.log(data);
                }
              }
            );
            msg.channel.send(
              new Discord.MessageEmbed()
                .setTitle(`Setup | 3/3`)
                .setColor(client.color)
                .setDescription(
                  `The response is \n**${response}**\nDo you to want have delete command usage?`
                )
            );
            responseCollector.stop();
            let deleteFilter = m => m.author.id === message.author.id;
            let deleteCollector = new Discord.MessageCollector(
              message.channel,
              deleteFilter,
              { max: 999 }
            );
            deleteCollector.on("collect", async msg => {
              let idkwor;
              if (msg.content.toLowerCase() === "yes") {
                deleteCollector.stop();
                idkwor = true;
                await db.findOne(
                  {
                    Guild: message.guild.id,
                    Command: name,
                    Response: response,
                  },
                  async (err, data) => {
                    if (data) {
                      data.Delete = idkwor;
                      await db.findOneAndUpdate(
                        {
                          Guild: message.guild.id,
                          Command: name,
                          Response: response,
                        },
                        data
                      );
                      msg.inlineReply(
                        `Saved **${data.Command}** as a custom command`
                      );
                    }
                  }
                );
              }
              if (msg.content.toLowerCase() === "no") {
                deleteCollector.stop();
                idkwor = false;
                await db.findOne(
                  {
                    Guild: message.guild.id,
                    Command: name,
                    Response: response,
                  },
                  async (err, data) => {
                    if (data) {
                      data.Delete = idkwor;
                      await db.findOneAndUpdate(
                        {
                          Guild: message.guild.id,
                          Command: name,
                          Response: response,
                        },
                        data
                      );
                      msg.inlineReply(
                        `Saved **${data.Command}** as a custom command`
                      );
                    }
                  }
                );
              }
              if (msg.content.toLowerCase() === "cancel") {
                msg.channel.send("The setup has been cancelled.");
                deleteCollector.stop();
                return;
              }
            });
          }
        });
      });
    }
  },
};
