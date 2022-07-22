const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const dotenv = require('dotenv').config();
const path = require('node:path')
const token = process.env.TOKEN;
const clientId = process.env.CLIENTID;

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

const configPath = path.join(__dirname, 'config')
const configFiles = fs.readdirSync(configPath).filter(file => file.endsWith('.json'));

configFiles.forEach(file => {
	try {
		const config = require(`./config/${file}`)
		console.log('Started refreshing application (/) commands.');

		rest.put(Routes.applicationCommands(clientId, config.guildId), { body: commands })
			.then(() => console.log('Successfully registered application commands.'))
			.catch(console.error);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})