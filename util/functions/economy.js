module.exports = async (client, message) => {
  const econ = require("../../models/econ");
  const user = require("../../models/users");
  client.createUser = id => {
    user.findOne({ User: id }, (err, data) => {
      new user({
        User: id,
      }).save();
    });
  };
  client.createProfile = id => {
    econ.findOne({ User: id }, (err, data) => {
      new econ({
        User: id,
      }).save();
    });
  };
  client.multi = message =>
    new Promise(async ful => {
      var multiplier = 0;
      const b = await user.findOne({ User: message.author.id });
      if (!b) {
        client.createUser(message.author.id);
      }
      if (b.Tier == 3) {
        multiplier += 0.1;
      }
      if (b.Tier == 2) {
        multiplier += 0.15;
      }
      if (b.Tier == 1) {
        multiplier += 0.2;
      }
      if (client.path.includes(message.guild.id)) {
        multiplier += 0.15;
      }
      if (
        [
          "🐱",
          "😾",
          "😿",
          "😽",
          "🙀",
          "😼",
          "😻",
          "😹",
          "😸",
          "😺",
          "cathexe",
          "cath",
        ]
          .map(x => (message.channel.name.includes(x) ? 1 : 0))
          .filter(x => x).length
      ) {
        multiplier += 0.1;
      }
      if (b.Premium === true) {
        multiplier += 0.25;
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

  client.add = (id, amount, message) => {
    econ.findOne({ User: id }, async (err, data) => {
      var multi = 0;
      if (err) throw err;
      if (data) {
        const users = require("../../models/users");
        users.findOne({ User: id }, (err, b) => {
          if (!b) {
            client.createUser(id);
          }
          if (b.Tier == 3) {
            multi += 0.1;
          }
          if (b.Tier == 2) {
            multi += 0.15;
          }
          if (b.Tier === 1) {
            multi += 0.2;
          }
          if (client.path.includes(message.guild.id)) {
            multi += 0.15;
          }
          if (
            [
              "🐱",
              "😾",
              "😿",
              "😽",
              "🙀",
              "😼",
              "😻",
              "😹",
              "😸",
              "😺",
              "cathexe",
              "cath",
            ]
              .map(x => (message.channel.name.includes(x) ? 1 : 0))
              .filter(x => x).length
          ) {
            multi += 0.1;
          }
          if (b.Premium === true) {
            multi += 0.25;
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
    const economy = require("../../models/inventory");
    economy.findOne({ User: id }, (err, data) => {
      if (!data) {
        client.createProfile(id);
      } else {
        data[item] += amount;
        data.save();
      }
    });
  };
  client.removeItem = (id, item, amount) => {
    const inventory = require("../../models/inventory");
    inventory.findOne({ User: id }, (err, data) => {
      if (!data) {
        client.createProfile(id);
      } else {
        data[item] -= amount;
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
