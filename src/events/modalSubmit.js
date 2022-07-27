const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const fs = require('node:fs')

module.exports = {
	name: 'modalSubmit',
	async execute(modal) {
        const mod = modal.client.modals.get(modal.customId);
        	if(!mod) return;

        	try {
         	   await mod.execute(modal);
        	} catch (error) {
            	   console.error(error);
            	   await modal.reply({ content: 'There was an error while executing this select menu', ephemeral: true});
        	}
            return;
	},
};