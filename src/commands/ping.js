const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const config = require('../config/' + interaction.guild.id + '.json');
		console.log(config.linkies)
		interaction.reply('Pong!');
	},
};