const { MessageEmbed } = require("discord.js");
const client = require("..");
/**
 * @param {String} message
 * @param {String} dir
 * @param {String} file
 * @param {String} err
 */
module.exports = async (message, dir, file, err) => {
  switch (err) {
    case 101:
      err = "Invalid argument";
      break;
    case 0:
      err = "Missing argument";
      break;
    case 1:
      err = "Missing 'User' argument";
      break;
    case 2:
      err = "'User' argument can't be author";
      break;
    case 3:
      err = "Missing 'Role' argument";
      break;
    case 4:
      err = "Missing 'Message' argument";
      break;
    case 5:
      err = "Missing 'Number' argument";
      break;
    case 6:
      err = "Missing permission";
      break;
    case 7:
      err = "Invalid number";
      break;
    case 8:
      err = "User doesn't have enough hierarchy";
      break;
    case 9:
      err = "Bot doesn't have enough hierarchy";
      break;
    case 10:
      err = "There isn't any data";
      break;
    case 11:
      err = "Missing 'Emoji' argument";
      break;
    case 12:
      err = "Missing 'Text' argument";
      break;
    case 13:
      err = "'Text' argument must be less than or equal to 100";
      break;
    case 14:
      err = "The maximum of modmail choices is 5";
      break;
    case 15:
      err = "Emoji can't be found";
      break;
    case 16:
      err = "'Time' argument must be larger than 1 second";
      break;
    case 17:
      err = "Missing 'Command'/'Category' argument";
      break;
    case 18:
      err = "'Command'/'Category' is already disabled";
      break;
    case 19:
      err = "Missing 'Time' argument";
      break;
    case 20:
      err = "Insufficient balance";
      break;
    case 21:
      err = "Missing 'Item' argument";
      break;
    case 22:
      err = "Invalid Item";
      break;
    case 23:
      err = "You didn't have enough item to gift";
      break;
    case 24:
      err = "Item invalid or you don't have that item";
      break;
    case 25:
      err = "Inventory is empty";
      break;
    case 26:
      err = "Giveaway not found";
      break;
    case 27:
      err = "Missing 'Message ID' argument";
      break;
    case 28:
      err = "Missing 'Channel' argument";
      break;
    case 29:
      err = "'Time' argument is invalid";
      break;
    case 30:
      err = "Missing 'Winners' argument";
      break;
    case 31:
      err = "'Winner' argument must be a number";
      break;
    case 32:
      err = "Missing 'Prize' argument";
      break;
    case 33:
      err = "You cannot hug yourself";
      break;
    case 34:
      err = "There isn't any song playing in the server currently";
      break;
    case 35:
      err = "You must be in a voice channel";
      break;
    case 36:
      err = "The player has stopped and the queue has been cleared";
      break;
    case 37:
      err = "There is no queue";
      break;
    case 38:
      err = "Can't find the playlist at YouTube";
      break;
    case 39:
      err = "Can't join the voice channel";
      break;
    case 40:
      err = "Left the voice channel since there is no song at the queue";
      break;
    case 41:
      err = "I am not in a voice channel";
      break;
    case 42:
      err = "I can't find this song/video";
      break;
    case 43:
      err = "I can't find the song at SoundCloud";
      break;
    case 44:
      err = "I can't find the song at YouTube";
      break;
    case 45:
      err = "Invalid selection";
      break;
    case 46:
      err = "Missing 'Prefix' argument";
      break;
    case 47:
      err = "Missing 'Command' argument";
      break;
    case 48:
      err = "The attachment must be an image";
      break;
    case 49:
      err = "'Emoji' name must be more than 2 characters";
      break;
    case 50:
      err =
        "The error maybe the link isn't a image, or the image size is too big";
      break;
    case 51:
      err = "Missing 'Query' argument";
      break;
    case 52:
      err = "This message doesn't exist in this channel";
      break;
    case 53:
      err = "Missing 'Code' argument";
      break;
    case 54:
      err = "'Text' argument must be less than or equal to 2000";
      break;
    case 55:
      err = "Different channel between user and client";
      break;
    case 404:
      err = "Error 404 - Not Found";
      break;
    case 505:
      err = "You have reached the maximum number of premium servers";
      break;
    case 506:
      err = "This server is already premium";
      break;
    case 999:
      err = "An unexpected error occured. Please try again.";
      break;
    default:
      "Missing argument";
      break;
  }
  const pull = require(`../../commands/${dir}/${file}`);
  const pre = await client.prefix(message);
  const embed = new MessageEmbed()
    .setAuthor(
      `Error from ${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true })
    )
    .setColor("RED")
    .setDescription(
      `${require("../config").ca}\nUse \`${pre}help ${
        pull.name
      }\` to get help\n\n `
    )
    .addField(
      `**>Usage**: ${pre}${pull.name} ${pull.usage ? pull.usage : ""}`,
      `\`${err}\``
    )
    .setTimestamp()
    .setThumbnail(client.user.displayAvatarURL({ dynamic: false }))
    .setURL(client.web)
    .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL());
  const msg = await message.reply({ embeds: [embed] });
  setTimeout(function () {
    msg.delete();
  }, 15000);
};
