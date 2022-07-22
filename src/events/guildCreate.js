const fs = require('node:fs')
module.exports = {
	name: 'guildCreate',
	execute(guild) {
		const temp = require('../configtemplate.json')
		temp.guildId = guild.id
		const template = JSON.stringify(temp)

		fs.writeFile('./config/' + guild.id + '.json', template, function (err) {
			if (err) throw err;
		  });
	},
};