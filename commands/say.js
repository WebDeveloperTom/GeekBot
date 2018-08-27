const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // $say hi
  // Hi
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.reply("oof.");
  }
  let botMessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botMessage);
};

module.exports.help = {
  name: "say"
};
