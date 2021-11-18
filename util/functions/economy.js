const guns = require("../Data/gun.json");
const req = {
  Iron: 0,
  Gold: 400,
  Platinum: 1000,
  Diamond: 2000,
  Master: 3500,
};
module.exports = async client => {
  const econ = require("../../models/econ");
  const user = require("../../models/users");
  client.createUser = id => {
    user.findOne({ User: id }, () => {
      new user({
        User: id,
      }).save();
    });
  };
  client.createProfile = id => {
    econ.findOne({ User: id }, () => {
      new econ({
        User: id,
      }).save();
    });
  };
  client.multi = interaction =>
    new Promise(async ful => {
      let multiplier = 0;
      const b = await user.findOne({ User: interaction.user.id });
      if (!b) {
        client.createUser(interaction.user.id);
      }
      if (b?.Premium === true) {
        multiplier += 0.25;
      }
      if (client.path.includes(interaction.guild.id)) {
        multiplier += 0.15;
      }
      if (interaction.channel.name.toLowerCase().includes("nyx")) {
        multiplier += 0.1;
      }

      ful(Math.round(multiplier * 10));
    });

  client.bal = id =>
    new Promise(async ful => {
      const data = await econ.findOne({ User: id });
      if (!data) {
        client.createProfile(id);
      }
      ful(data.CP);
    });

  client.add = (id, amount, interaction) => {
    econ.findOne({ User: id }, async (err, data) => {
      let multi = 0;
      if (err) throw err;
      if (data) {
        const users = require("../../models/users");
        users.findOne({ User: id }, (err, b) => {
          if (!b) {
            client.createUser(id);
          }
          if (b?.Premium === true) {
            multi += 0.25;
          }

          if (client.path.includes(interaction.guild.id)) {
            multi += 0.15;
          }
          if (interaction.channel.name.toLowerCase().includes("nyx")) {
            multi += 0.1;
          }
          if (multi === 0) {
            data.CP += amount;
            data.save();
          } else {
            data.CP += Math.round(amount * multi + amount);
            data.save();
          }
        });
      } else {
        client.createProfile(id);
      }
    });
  };
  client.rmv = (id, amount) => {
    econ.findOne({ User: id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        data.CP -= amount;
        data.save();
      } else {
        client.createProfile(id);
      }
    });
  };
  client.addItem = (id, item, amount) => {
    const economy = require("../../models/econ");
    economy.findOne({ User: id }, (err, data) => {
      if (!data) {
        client.createProfile(id);
      } else {
        data.Inventory[item] += amount;
        data.save();
      }
    });
  };
  client.removeItem = (id, item, amount) => {
    const inventory = require("../../models/econ");
    inventory.findOne({ User: id }, (err, data) => {
      if (!data) {
        client.createProfile(id);
      } else {
        data.Inventory[item] -= amount;
        data.save();
      }
    });
  };
  client.addcmdsused = id => {
    user.findOne({ User: id }, async (err, data) => {
      if (err) console.log(err);
      if (data) {
        data.CommandUsed++;
        data.save();
      } else {
        client.createUser(id);
      }
    });
  };

  client.ADDBJWin = id => {
    econ.findOne({ User: id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        data.BJWins++;
        data.save();
      } else {
        client.createProfile(id);
      }
    });
  };
  client.ADDSWin = id => {
    econ.findOne({ User: id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        data.SlotsWins++;
        data.save();
      } else {
        client.createProfile(id);
      }
    });
  };
  client.ADDBWin = id => {
    econ.findOne({ User: id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        data.BetWins++;
        data.save();
      } else {
        client.createProfile(id);
      }
    });
  };
  client.addXP = async (id, xp, message) => {
    try {
      const data = await econ.findOne({ User: id });
      if (data?.Gun.XP >= 0) {
        data.Gun.XP += xp;
        data.Gun.Level = Math.floor(0.1 * Math.sqrt(data.Gun.XP));
        await data.save().catch(e => console.log(e));
        const emoji = guns.find(z => z.name === data.Gun.Name).emoji;
        if ((data.Gun.XP -= xp) < req[data.Gun.Rank]) {
          message.channel.send({
            content: `Congratulations **${message.user.tag}**! Your **${emoji}${data?.Gun.Name}** has upgraded to level **${data?.Gun.Rank}**!`,
          });
        }
        if (data?.Gun.XP < 400) {
          data.Gun.Rank = "Iron";
          await data.save().catch(e => console.log(e));
        }
        if (data?.Gun.XP >= 400 && data?.Gun.XP < 1000) {
          data.Gun.Rank = "Gold";
          await data.save().catch(e => console.log(e));
        }
        if (data?.Gun.XP >= 1000 && data?.Gun.XP < 2000) {
          data.Gun.Rank = "Platinum";
          await data.save().catch(e => console.log(e));
        }
        if (data?.Gun.XP >= 2000 && data?.Gun.XP < 3500) {
          data.Gun.Rank = "Diamond";
          await data.save().catch(e => console.log(e));
        }
        if (data?.Gun.XP >= 3500) {
          data.Gun.Rank = "Master";
          await data.save().catch(e => console.log(e));
        }

        // if (Math.floor(0.1 * Math.sqrt((data.Gun.XP -= xp))) < data.Gun.Level) {
        //   if (data?.Gun.Name) {
        //     const emoji = guns.find(z => z.name === data?.Gun.Name).emoji;
        //     message.channel.send({
        //       content: `Congratulations **${message.user.tag}**! Your **${emoji}${data?.Gun.Name}** has upgraded to level **${data?.Gun.Level}**!`,
        //     });
        //   } else;
        // }
      } else {
        const ee = new econ({
          User: id,
          Gun: {
            XP: xp,
            Level: Math.floor(0.1 * Math.sqrt(xp)),
          },
        });
        if (ee?.Gun.XP >= 400 && ee?.Gun.XP < 1000) {
          ee.Gun.Rank = "Gold";
          const emoji = guns.find(z => z.name === ee?.Gun.Name).emoji;
          message.channel.send({
            content: `Congratulations **${message.user.tag}**! Your **${emoji}${ee?.Gun.Name}** has upgraded to rank **${ee?.Gun.Rank}**!`,
          });
          await ee.save().catch(e => console.log(e));
        }
        if (ee?.Gun.XP >= 1000 && ee?.Gun.XP < 2000) {
          ee.Gun.Rank = "Platinum";
          const emoji = guns.find(z => z.name === ee?.Gun.Name).emoji;
          message.channel.send({
            content: `Congratulations **${message.user.tag}**! Your **${emoji}${ee?.Gun.Name}** has upgraded to rank **${ee?.Gun.Rank}**!`,
          });
          await ee.save().catch(e => console.log(e));
        }
        if (ee?.Gun.XP >= 2000 && ee?.Gun.XP < 3500) {
          ee.Gun.Rank = "Diamond";
          const emoji = guns.find(z => z.name === ee?.Gun.Name).emoji;
          message.channel.send({
            content: `Congratulations **${message.user.tag}**! Your **${emoji}${ee?.Gun.Name}** has upgraded to rank **${ee?.Gun.Rank}**!`,
          });
          await ee.save().catch(e => console.log(e));
        }
        if (ee?.Gun.XP >= 3500) {
          ee.Gun.Rank = "Master";
          const emoji = guns.find(z => z.name === ee?.Gun.Name).emoji;
          message.channel.send({
            content: `Congratulations **${message.user.tag}**! Your **${emoji}${ee?.Gun.Name}** has upgraded to rank **${ee?.Gun.Rank}**!`,
          });
          await ee.save().catch(e => console.log(e));
        }
        await ee.save().catch(e => console.log(e));
        // if (Math.floor(0.1 * Math.sqrt(xp)) > 0) {
        //   if (ee?.Gun.Name) {
        //     const emoji = guns.find(z => z.name === ee?.Gun.Name).emoji;
        //     message.channel.send({
        //       content: `Congratulations **${message.user.tag}**! Your **${emoji}${ee?.Gun.Name}** has upgraded to level **${ee?.Gun.Level}**!`,
        //     });
        //   } else;
        // }
      }
    } catch (e) {
      console.log(e);
    }
  };
  client.cmdsUSED = id =>
    new Promise(async ful => {
      const data = await user.findOne({ User: id });
      if (!data) {
        client.createProfile(id);
      }
      ful(data.CommandUsed);
    });

  client.bjWin = id =>
    new Promise(async ful => {
      const data = await econ.findOne({ User: id });
      if (!data) {
        client.createProfile(id);
      }
      ful(data.BJWins);
    });

  client.sWin = id =>
    new Promise(async ful => {
      const data = await econ.findOne({ User: id });
      if (!data) {
        client.createProfile(id);
      }
      ful(data.SlotsWins);
    });

  client.bWin = id =>
    new Promise(async ful => {
      const data = await econ.findOne({ User: id });
      if (!data) {
        client.createProfile(id);
      }
      ful(data.BetWins);
    });
};
