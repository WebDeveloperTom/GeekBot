const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.reply("You can't do that");
  if (args[0] == "help") {
    message.reply("Usage: $removerole <user> <role to remove>");
    return;
  }
  let rUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!rUser) return message.reply("Couldnt find user.");

  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Specify a role!");
  let sRole = message.guild.roles.find(`name`, role);
  if (!sRole) return message.reply("Couldnt find that role.");

  if (!rUser.roles.has(sRole.id))
    return message.reply("They already have that role.");
  await rUser.removeRole(sRole.id);
  try {
    await rUser.send(`You have been removed from the role of ${sRole.name}`);
  } catch (e) {
    message.channel.send(
      `${rUser.id}, You have been removed from the role of ${
        sRole.name
      }. We tried to DM them, but their DMs are locked.`
    );
  }
};

module.exports.help = {
  name: "removerole"
};
