module.exports = {

    customId: 'add-confirm',

    async execute(interaction) {
        console.log('triggered button')
        const config = require('.../config/' + interaction.guild.id)
        console.log(config)
        
        config[linkie].links.push({"label": label, "link": url})
                fs.writeFile('config.json', JSON.stringify(config), function (err) {
                    console.error(err);
                });

                const success = new MessageEmbed()
                    .setTitle('Link added')
                    .setColor('GREEN')
                    .setDescription('Link ' + label + ' added successfully to **' + linkie + '**!')
                    .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})

                interaction.reply({ text: " ", embeds: [success], ephemeral: true })
    }
}