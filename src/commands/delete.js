const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, showModal, SelectMenuComponent } = require('discord-modals');
const { MessageEmbed, MessageActionRow } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Deletes a linkie'),
                    
	async execute(interaction) {
        const config = require('../config/' + interaction.guild.id)

        if (config.linkies.length > 0) {
            const removeEmbed = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle('Select Linkie')
                .setDescription('Select the linkie you would like to delete')
                .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})

            const row = new MessageActionRow()
                .addComponents(
                    new SelectMenuComponent()
                        .setCustomId('deleteLinkieMenu')
                        .setOptions([])
                )

            config.linkies.forEach((element, index) => {
                row.components[0].options.push({ label: element.name, value: index })
            })
            interaction.reply({ content: ' ', embeds: [removeEmbed], components: [row], ephemeral: true})
        } else {
            const noLinkies = new MessageEmbed()
                .setColor('DARK_RED')
                .setTitle('No Linkies Found')
                .setDescription("Make sure you've created a linkie using **/new**, otherwise if you think this is an error join our [support server](https://discord.gg/FBfWyvajcK).")
                .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})

            interaction.reply({ content: ' ', embeds: [noLinkies], ephemeral: true})
        }
    }
};