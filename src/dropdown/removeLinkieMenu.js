const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    customId: "removeLinkieMenu",

    async execute(interaction) {
        const config = require('../config/' + interaction.guild.id)
        const linkie = interaction.values[0]
    
        const links = new MessageEmbed()
            .setColor('RED')
            .setTitle('Which link should I delete?')
            .setDescription('Select the link to delete from **' + config.linkies[linkie] + '**')

            const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('removeLink')
                    .setOptions([])
            )

        config.linkies[linkie].links.forEach ((element, index) => {
            links.addField(`**${index + 1}**. ${element.label}`, element.link, true)
        });

        config.linkies[linkie].links.forEach((element, index) => {
            row.components[0].options.push({ label: element.label, description: element.link, value: `config.linkies[${linkie}].links[${index}]` })
        })

        interaction.reply({ content: ' ', embeds: [links], components: [row], ephemeral: true })
    }
}