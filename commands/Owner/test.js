// const { Client, Message, MessageEmbed } = require("discord.js");
// const db = require("../../models/bot");
// module.exports = {
//   name: "test",
//   Owner: true,
//   /**
//    * @param {Client} client
//    * @param {Message} message
//    * @param {String[]} args
//    */
//   run: async (client, message, args) => {
//     db.findOne({ Bot: client.user.id }, async (err, data) => {
//       let cmdstatus;
//       if (!data) {
//         return;
//       } else {
//         data.Commands.map(x => {
//           const arr = Object.values(x.commands);
//           const finded = arr.find(a => a.name == args[0].toLowerCase());
//           if (!finded) return;
//           else cmdstatus = finded.status;
//         });
//         data.Commands.commands.status = false;

//         if (cmdstatus === true) {
//           cmdstatus = false;
//           await db.findOneAndUpdate({ Bot: client.user.id }, data);
//         }
//       }
//     });
//   },
// };
