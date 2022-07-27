const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const fs = require('node:fs')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('new')
		.setDescription('Creates a new linkie')
        .addStringOption(name =>
            name.setName('name')
                    .setDescription('Name of the new Linkie')
                    .setRequired(true)),
                    
	async execute(interaction) {
        const config = require('../config/' + interaction.guild.id)
        const name = interaction.options.getString('name');

        if (!config.linkies.filter(e => e.name === name).length > 0) {
            const successEmbed = new MessageEmbed()
                .setColor('#5865F2')
                .setTitle('Linkie created!')
                .setDescription('Your linkie has been created. Use **/add** to add links.')
                .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
            
            config.linkies.push({"name": name, "links":[]})
            console.log(config)
            fs.writeFile('config/' + interaction.guild.id + '.json', JSON.stringify(config), function (err) {
                console.log(err);
            });

            interaction.reply({ embeds: [successEmbed], ephemeral: true })
        } else {
            const errorEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Linkie exists!')
                .setDescription('A linkie with this name already exists, if you believe this is an error consider joining our [support server](https://discord.gg/FBfWyvajcK).')
                .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
            
            interaction.reply({ embeds: [errorEmbed], ephemeral: true })
        }
    }
};