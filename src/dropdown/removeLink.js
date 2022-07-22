const { MessageEmbed } = require('discord.js')
const fs = require('node:fs')
const sequelize = require('sequelize')

module.exports = {
    customId: "removeLink",
    async execute(interaction) {

        const config = require('../config/' + interaction.guild.id) 
        const value = interaction.values[0]
        const split1 = value.split('[')
        const split2 = split1[1].split(']')
        const split3 = split1[2].split(']')
        const number = split3[0]
        const linkie = split2[0]

        splice = config.linkies[linkie].links.splice(number+1)
        
        config.linkies[linkie].links = splice

        console.log(config)

        fs.writeFile('config/' + interaction.guild.id + '.json', JSON.stringify(config), function (err) {
            console.log(err);
        });

        const deletedEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`Deleted link!`)
            .setDescription('Link deleted successfully from linkie.')
            .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
        
        interaction.reply({ content: ' ', embeds: [deletedEmbed], ephemeral: true })
    }
}