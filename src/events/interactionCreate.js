module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
	
			if (!command) return;
		
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		} else if (interaction.isButton()) {
			const button = interaction.client.buttons.get(interaction.customId)

        	if(!button) return;

        	try {
         	   	await button.execute(interaction);
        	} catch (error) {
            	console.error(error);
            	await interaction.reply({ content: 'There was an error while executing this button', ephemeral: true});
        	}
		} else if (interaction.isSelectMenu()) {
			const selectMenu = interaction.client.selectMenus.get(interaction.customId);

        	if(!selectMenu) return;

        	try {
         	   	await selectMenu.execute(interaction);
        	} catch (error) {
            	console.error(error);
            	await interaction.reply({ content: 'There was an error while executing this select menu', ephemeral: true});
        	}
		} else {
			console.error("Interaction could not be located.")
		}
	},
};