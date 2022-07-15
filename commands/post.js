const { SlashCommandBuilder } = require('@discordjs/builders');
const { showModal, Modal, TextInputComponent, SelectMenuComponent } = require('discord-modals');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('post')
		.setDescription('Posts an existing linkie to the channel this command is executed in.'),
			
	async execute(interaction) {
	
                const config = require('../config/' + interaction.guild.id)

                const modal = new Modal()
                    .setCustomId('postModal')
                    .setTitle('Post Linkie')
                    .addComponents(
                        new SelectMenuComponent()
                                .setCustomId('postModalLinkieInput')
                                .setPlaceholder('Select the linkie to post')
                                .addOptions([]),
                        new SelectMenuComponent()
                                .setCustomId('postModalColorInput')
                                .setPlaceholder('Color of the embed (No effect if embed is false)')
                                .addOptions([
                                        { label: 'Default', value: 'DEFAULT' },
                                        { label: 'Aqua', value: 'AQUA' },
                                        { label: 'Dark Aqua', value: 'DARK_AQUA' },
                                        { label: 'Green', value: 'GREEN' },
                                        { label: 'Dark Green', value: 'DARK_GREEN' },
                                        { label: 'Blue', value: 'BLUE' },
                                        { label: 'Dark Blue', value: 'DARK_BLUE' },
                                        { label: 'Purple', value: 'PURPLE' },
                                        { label: 'Dark Purple', value: 'DARK_PURPLE' },
                                        { label: 'Luminous Vivid Pink', value: 'LUMINOUS_VIVID_PINK' },
                                        { label: 'Dark Vivid Pink', value: 'DARK_VIVID_PINK' },
                                        { label: 'Gold', value: 'GOLD' },
                                        { label: 'Dark Gold', value: 'DARK_GOLD' },
                                        { label: 'Orange', value: 'ORANGE' },
                                        { label: 'Dark Orange', value: 'DARK_ORANGE' },
                                        { label: 'Red', value: 'RED' },
                                        { label: 'Dark Red', value: 'DARK_RED' },
                                        { label: 'Gray', value: 'GREY' },
                                        { label: 'Dark Gray', value: 'DARK_GREY' },
                                        { label: 'Darker Gray', value: 'DARKER_GREY' },
                                        { label: 'Light Gray', value: 'LIGHT_GREY' },
                                        { label: 'Navy Blue', value: 'NAVY' },
                                        { label: 'Dark Navy Blue', value: 'DARK_NAVY' },
                                        { label: 'Yellow', value: 'YELLOW' },
                                        { label: 'White', value: 'WHITE' } 
                                ]),
                        new TextInputComponent()
                                .setCustomId('postModalTitleInput')
                                .setLabel("Title of the embed")
                                .setPlaceholder("No effect if embed is false")
                                .setMaxLength(50)
                                .setStyle('SHORT'),
                        new TextInputComponent()
                                .setCustomId('postModalDescriptionInput')
                                .setLabel("Description or main text with the embed")
                                .setPlaceholder("No effect if embed is false")
                                .setMaxLength(250)
                                .setStyle('LONG')
                    );

                config.linkies.forEach((element, index) => {
                    modal.components[0].components[0].options.push({ label: element.name, value: index })
                })

                function inRange(x, min, max) {
                        return ((x-min)*(x-max) <= 0);
                }
                
                showModal(modal, {
                    client: interaction.client,
                    interaction: interaction
                });
	},
};