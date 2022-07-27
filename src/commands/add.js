const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { showModal, Modal, TextInputComponent, SelectMenuComponent } = require('discord-modals');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Adds a link to an existing linkie'),
			
	async execute(interaction) {
	
        const config = require('../config/' + interaction.guild.id)

        if (config.linkies.length > 0) {
            const modal = new Modal()
            .setCustomId('addModal')
            .setTitle('Add A Link')
            .addComponents(
                new SelectMenuComponent()
                    .setCustomId('addModalLinkieInput')
                    .setPlaceholder('Select the linkie to add to')
                    .addOptions([]),
                new TextInputComponent()
                    .setCustomId('addModalLabelInput')
                    .setLabel('Label for the new link')
                    .setMaxLength(50)
                    .setRequired(true)
                    .setStyle('SHORT'),
                new TextInputComponent()
                    .setCustomId('addModalURLInput')
                    .setLabel('Insert the URL of the link')
                    .setMaxLength(512)
                    .setRequired(true)
                    .setPlaceholder('Make sure the URL is valid (meaning it contains https:// or http://)')
                    .setStyle('SHORT')
            );

            config.linkies.forEach((element, index) => {
                modal.components[0].components[0].options.push({ label: element.name, value: index })
            })

            showModal(modal, {
                client: interaction.client,
                interaction: interaction
            });
        } else {
            const noLinkiesEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle('No linkies found!')
                .setDescription('Make sure you create a linkie using **/new** before adding links! Think this is an error? Join our [support server](https://discord.gg/FBfWyvajcK)')
                .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
            
            interaction.reply({ embeds: [noLinkiesEmbed], ephemeral: true })
        }
	},
};