const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //$8ball <question ...>
  if (args[0] == "help") {
    message.reply("Usage: $8ball <question>");
    return;
  }
  if (!args[2]) {
    return message.reply("Please ask a full question!");
  }

  let replies = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes - definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no",
    "Outlook not so good.",
    "Very doubtful."
  ];

  let result = Math.floor(Math.random() * replies.length);
  message.reply(replies[result]);
  message.channel.send("ALL HAIL THE MAGIC CONCH!");
};

module.exports.help = {
  name: "magicconch"
};
