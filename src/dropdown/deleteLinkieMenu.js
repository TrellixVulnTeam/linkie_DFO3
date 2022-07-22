const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const fs = require('node:fs');

module.exports = {
    customId: "deleteLinkieMenu",

    async execute(interaction) {

        const config = require('../config/' + interaction.guild.id)
        const linkie = interaction.values[0]
        
        if(config.linkies[linkie]) {
            try {
                delete config.linkies[linkie];
                config.linkies.splice(config.linkies.indexOf(linkie))
                const success = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Deleted successfully")
                    .setDescription("Linkie deleted successfully.")
                    .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})

                fs.writeFile('config/' + interaction.guild.id + '.json', JSON.stringify(config), function (err) {
                    console.log(err);
                });

                interaction.reply({ content: ' ', embeds: [success], ephemeral: true })
            } catch (err) {
                const error = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("An error occurred")
                    .setDescription("I was able to locate the linkie, but encountered an error while deleting it. Consider joining our [support server](https://discord.gg/FBfWyvajcK)")
                    .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
                console.log(error);
                interaction.reply({ content: ' ', embeds: [error], ephemeral: true })
            }
        } else {
            const notFound = new MessageEmbed()
                .setColor("RED")
                .setTitle("Not found")
                .setDescription("This linkie might've been deleted, otherwise consider joining our [support server](https://discord.gg/FBfWyvajcK)")
                .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
            interaction.reply({ content: ' ', embeds: [notFound], ephemeral: true })
        }
    }
}