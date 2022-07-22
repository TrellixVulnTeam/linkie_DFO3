const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, DiscordAPIError } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('preview')
		.setDescription('Preview a linkie before posting')
        .addStringOption(linkie => 
            linkie.setName('linkie')
            .setDescription("Select the linkie to preview")
            .setRequired(true)),

	async execute(interaction) {

        const config = require('../config/' + interaction.guild.id + '.json');
        const linkie = interaction.options.getString('linkie');
		const preview = new MessageEmbed()
            .setTitle("Preview of " + linkie)
            .setDescription("These are all the labels and links of the selected **" + linkie + "** linkie.")
            .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
            .setColor("BLURPLE")

        var count = 1;

        config.linkies.find(item => item.name === linkie).links.forEach (index => {
            preview.addField("**" + count + "**. " + index.label, index.link)
            count = count + 1
        });

        interaction.reply({ text: " ", embeds: [preview], ephemeral: true })
	}
};