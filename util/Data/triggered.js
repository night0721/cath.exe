const { Canvas } = require('canvacord')
const { Client, Message, MessageAttachment } = require('discord.js')
module.exports = {
  name: 'trigger',
  aliases: ['triggered'],
  usage: '(?@User/ User ID)',
  description: "Have a trigger effect on a user's avatar",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
  */
  run: async(client, message, args) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
    const ava = user.displayAvatarURL({ format: 'png' })

    const imga = await Canvas.trigger(ava)

    message.channel.send(
      new MessageAttachment(imga, 'imgae.gif')
    )
  }
}