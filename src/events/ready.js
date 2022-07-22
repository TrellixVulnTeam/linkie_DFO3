const chalk = require('chalk')
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity("linkie.gg", { type: "WATCHING" })
		console.log(chalk.gray('[INFO] ') + chalk.white('Bot logged in successfully under ') + chalk.cyan(chalk.bold(`${client.user.tag}`)))
	},
};