const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
require("discord-modals");

module.exports = {
    customId: "postModal",

    async execute(modal) {
            const config = require('../config/' + modal.guild.id)
            const id = modal.channelId
            const linkie = modal.getSelectMenuValues('postModalLinkieInput');
            const color = modal.getSelectMenuValues('postModalColorInput');
            const title = modal.getTextInputValue('postModalTitleInput');
            const description = modal.getTextInputValue('postModalDescriptionInput');

            const channel = modal.client.channels.cache.get(id);

            const row = new MessageActionRow();
            const row2 = new MessageActionRow();
            const row3 = new MessageActionRow();
            const row4 = new MessageActionRow();
            const row5 = new MessageActionRow();

            function inRange(x, min, max) {
                    return ((x-min)*(x-max) <= 0);
            }
                
            var count = 0;
            config.linkies[linkie].links.forEach (index => {
                    if (inRange(count, 0, 4)) {
                            row.components[count] = new MessageButton()
                            .setLabel(index.label)
                            .setURL(index.link)
                            .setStyle('LINK')
                    } else if (inRange(count, 4, 9)) {
                            row2.components[count-5] = new MessageButton()
                            .setLabel(index.label)
                            .setURL(index.link)
                            .setStyle('LINK')  
                            console.log("Added to Row 2")
                    } else if (inRange(count, 10, 14)) {
                            row3.components[count-10] = new MessageButton()
                            .setLabel(index.label)
                            .setURL(index.link)
                            .setStyle('LINK')   
                    } else if (inRange(count, 15, 19)) {
                            row4.components[count-15] = new MessageButton()
                            .setLabel(index.label)
                            .setURL(index.link)
                            .setStyle('LINK')  
                    } else if (inRange(count, 20, 24)) {
                            row5.components[count-20] = new MessageButton()
                            .setLabel(index.label)
                            .setURL(index.link)
                            .setStyle('LINK')  
                    }

                    count = count + 1
            });
            if (config.linkies[linkie].links.length > 0) {
                try {
                        if (color && title && description) {
                                const embed = new MessageEmbed ()
                                        .setColor(color[0])
                                        .setTitle(title)
                                        .setDescription(description)
                                        .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
    
                                if (inRange(count, 0, 4)) {
                                        console.log("Posted 1 row.")
                                        channel.send({ content: ' ', embeds: [embed], components: [row]});
                                } else if (inRange(count, 4, 9)) {
                                        channel.send({ content: ' ', embeds: [embed], components: [row, row2]});
                                        console.log("Posted 2 rows.")
                                } else if (inRange(count, 10, 14)) {
                                        channel.send({ content: ' ', embeds: [embed], components: [row, row2, row3]});
                                        console.log("Posted 3 rows.")
                                } else if (inRange(count, 15, 19)) {
                                        channel.send({ content: ' ', embeds: [embed], components: [row, row2, row3, row4]});
                                } else {
                                        channel.send({ content: ' ', embeds: [embed], components: [row, row2, row3, row4, row5]});
                                }
                        } else {
                                if (row.length > 0 && !row2.length > 0) {
                                        console.log("Posted 1 row.")
                                        channel.send({ content: ' ', components: [row]});
                                } else if (!row2.length > 0 && !row3.length > 0) {
                                        channel.send({ content: ' ', components: [row, row2]});
                                        console.log("Posted 2 rows.")
                                } else if (!row3.length > 0 && !row4.length > 0) {
                                        channel.send({ content: ' ', components: [row, row2, row3]});
                                        console.log("Posted 3 rows.")
                                } else if (!row4.length > 0 && !row5.length > 0) {
                                        channel.send({ content: ' ', components: [row, row2, row3, row4]});
                                } else {
                                        channel.send({ content: ' ', components: [row, row2, row3, row4, row5]});
                                }
                        }
    
                        const successEmbed = new MessageEmbed()
                        .setColor('#5865F2')
                        .setTitle('Linkie successfully posted!')
                        .setDescription('Your linkie was successfully posted to <#' + channel + '>')
                        .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
    
                        modal.reply({ embeds: [successEmbed], ephemeral: true })
    
                } catch (error) {
                        console.error(error);
                        const errorEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('An error occurred')
                        .setDescription('Posting this linkie caused an error to occur. Consider joining the support server for more help.')
                        .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
                        await modal.reply({ content: ' ', embeds: [errorEmbed], ephemeral: true });
                }
            } else {
                const noLinksEmbed = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('No links found')
                        .setDescription("This linkie contains no links. Please add links using **/add** before posting.")
                        .setFooter({ text: 'Powered by linkie.gg', iconURL: 'https://i.imgur.com/J5ymdbf.png'})
                        await modal.reply({ content: ' ', embeds: [noLinksEmbed], ephemeral: true });
            }
            return;
    }
}