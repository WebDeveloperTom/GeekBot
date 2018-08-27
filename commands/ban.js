const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.channel.send("Nice try guy!");
  if (args[0] == "help") {
    message.reply("Usage: $ban <user> <reason>");
    return;
  }
  let bUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!bUser) return message.channel.send("Couldn't find user.");
  let bReason = args.join(" ").slice(22); //slice(22) gets rid of User ID
  if (bUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("They're my boss...");
  let banEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField(
      "Banned By",
      `<@${message.author.id}> with ID ${message.author.id}`
    )
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

  let banChannel = message.guild.channels.find(`name`, "incidents");
  if (!banChannel)
    return message.channel.send("Couldn't find incidents channel.");
  message.guild.member(bUser).ban(bReason);
  banChannel.send(banEmbed);
};

module.exports.help = {
  name: "ban"
};
