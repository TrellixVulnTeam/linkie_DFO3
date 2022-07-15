const { MessageEmbed } = require('discord.js')
const fs = require('node:fs')

module.exports = {
    customId: "addModal",

    async execute(modal) {
        function validURL(string) {
            let url;         
            try {
              url = new URL(string);
            } catch (_) {
              return false;  
            }
            return url.protocol === "http:" || url.protocol === "https:";
        }

        function alreadyExists(config, linkie, label, url) {

            values = []
            config.linkies[linkie].links.forEach(index => {
                if (index.label === label || index.link === url) {
                    values.push(true)
                } else {
                    values.push(false)
                }
            })
            if (values.includes(true)) { return true } else { return false }
        }

        const config = require('../config/' + modal.guildId)
        const linkie = parseInt(modal.getSelectMenuValues('addModalLinkieInput'))
        const label = modal.getSelectMenuValues('addModalLabelInput')
        const url = modal.getTextInputValue('addModalURLInput')

        if (alreadyExists(config, linkie, label, url)) {
            const exists = new MessageEmbed()
                .setTitle('Already exists')
                .setColor('RED')
                .setDescription('This link already exists. Consider changing the label or URL.')
                .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})

                modal.reply({ text:" ", embeds: [exists], ephemeral: true })
        } else if (!validURL(url)) { 
            const invalid = new MessageEmbed()
                .setTitle('Invalid URL')
                .setColor('RED')
                .setDescription('URL ' + url + ' is invalid and cannot be registered. Make sure your URL contains https:// or http://')
                .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})

            modal.reply({ text:" ", embeds: [invalid], ephemeral: true })
        } else {
            
            config.linkies[linkie].links.push({"label": label, "link": url})
                fs.writeFile('config/' + modal.guild.id + '.json', JSON.stringify(config), function (err) {
                    console.error(err);
                });

            const success = new MessageEmbed()
                .setTitle('Link added')
                .setColor('GREEN')
                .setDescription(`Link **${label}** added successfully to **${linkie.name}**`)
                .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})

            modal.reply({ text: " ", embeds: [success], ephemeral: true })
        }
    }
}