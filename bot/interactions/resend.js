const { SlashCommandBuilder } = require('@discordjs/builders');
const {
  MessageEmbed, MessageActionRow, MessageButton, Permissions,
} = require('discord.js');

const Guild = require('../../db/models/guild');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resend')
    .setDescription('Provides you a list default commands'),
  async execute(interaction, client) {
    if (interaction.member.permissions.has(Permissions.MANAGE_GUILD)) {
<<<<<<< HEAD
      Guild.findOne({ id: interaction.guild.id }).then(async (dbGuild) => {
        const helpEmbed = new MessageEmbed()
          .setTitle('> Ticket')
          .setDescription(dbGuild.settings.messages.create.replaceAll('\\n', '\n'))
          .setFooter({ text: client.user.tag, iconURL: client.user.avatarURL({ dynamic: true }) });
=======
      const helpEmbed = new MessageEmbed()
        .setTitle('> Ticket')
        .setDescription('To create a ticket please use the buttons below.')
        .setFooter({ text: client.user.tag, iconURL: client.user.avatarURL({ dynamic: true }) });
>>>>>>> 1639eb7019f6697dd5445ae7fa58587f33675055

        const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('ticket-create')
              .setDisabled(false)
              .setEmoji('🎫')
              .setStyle('SUCCESS'),
          );

        interaction.deferReply();
        interaction.deleteReply();
        const msg = await interaction.channel.messages.fetch(dbGuild.settings.message)
        msg.delete();

        const message = await interaction.channel.send({ embeds: [helpEmbed], ephemeral: false, components: [row] });
        dbGuild.settings.message = message.id;
        dbGuild.settings.channel = interaction.channel.id;
        dbGuild.save();
      });
    } else {
      const errorEmbed = new MessageEmbed()
        .setTitle('> Settings')
        .setDescription('You are not a server administrator.')
        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) });

      interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};
