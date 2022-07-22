const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv').config();
const token = process.env.TOKEN;
const chalk = require('chalk');
const discordModals = require('discord-modals');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '9' }).setToken(token);
	
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.buttons = new Collection();
const buttonFolders = fs.readdirSync('./buttons');

for (const folder of buttonFolders) {
    const buttonFiles = fs.readdirSync(`./buttons/`).filter(file => file.endsWith('.js'));
    for (const file of buttonFiles) {
        const button = require(`./buttons/${file}`);
        client.buttons.set(button.customId, button);
    }
}

client.selectMenus = new Collection();
const selectMenusPath = path.join(__dirname, 'dropdown');
const selectMenuFiles = fs.readdirSync(selectMenusPath).filter(file => file.endsWith('.js'));

for (const file of selectMenuFiles) {
	const filePath = path.join(selectMenusPath, file);
	const selectMenu = require(filePath);
	client.selectMenus.set(selectMenu.customId, selectMenu);
}

client.modals = new Collection();
const modalsPath = path.join(__dirname, 'modals');
const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));

for (const file of modalFiles) {
	const filePath = path.join(modalsPath, file);
	const modal = require(filePath);
	client.modals.set(modal.customId, modal);
}

discordModals(client);
client.login(token);