const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // $clear [num]
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.reply("oof.");
  }
  if (args[0] == "help") {
    message.reply("Usage: $clear <number of above messages to clear>");
    return;
  }
  // num = the cmd message + the number of requested messaged to delete
  let num = parseInt(args[0]) + 1;

  if (!args[0]) return message.channel.send("How many?");
  message.channel.bulkDelete(num).then(() => {
    message.channel
      .send(`Cleared ${args[0]} messages.`)
      .then(msg => msg.delete(5000));
  });
};

module.exports.help = {
  name: "clear"
};
