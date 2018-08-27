const Discord = require("discord.js");
const superAgent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let { body } = await superAgent.get("https://random.dog/woof.json");

  let dogEmbed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Doggo :dog:")
    .setImage(body.url);
  message.channel.send("One good boy coming right up!");
  message.channel.send(dogEmbed);
};

module.exports.help = {
  name: "doggo"
};
