import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { client } from "../..";

export default new Command({
    name: "tictactoe",
    description: "Play a game of tic tac toe with a friend :D",
    options: [
        {
            name: "friend",
            description: "your friend :D",
            type: "USER",
            required: true
        }
    ],
    run: async ({ interaction }) => {
        var you = interaction.user;
        var friend = interaction.options.getUser("friend");

        var confirmationEmbed = new MessageEmbed()
            .setTitle(`🎮 Tic Tac Toe`)
            .setColor("#2F3136")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setDescription(`${you.username} has challenged you to a game, do you accept?`);
        
        var confirmationButtons = new MessageActionRow()
        confirmationButtons.addComponents(
            new MessageButton()
                .setEmoji("✅")
                .setCustomId("yes")
                .setStyle("SUCCESS"),
            
            new MessageButton()
                .setEmoji("✖")
                .setCustomId("no")
                .setStyle("DANGER")
        )
        
        interaction.followUp({content: "<@" + friend.id + ">", embeds: [confirmationEmbed], components: [confirmationButtons]});

        var row1 = new MessageActionRow()
        var row2 = new MessageActionRow()
        var row3 = new MessageActionRow()

        for (var i = 0; i < 3; i++) {
            row1.addComponents(
                new MessageButton()
					.setCustomId(i.toString())
					.setLabel(' ')
                    .setStyle("SECONDARY")
            )
            row2.addComponents(
                new MessageButton()
					.setCustomId((i + 3).toString())
					.setLabel(' ')
                    .setStyle("SECONDARY")
            )
            row3.addComponents(
                new MessageButton()
					.setCustomId((i + 6).toString())
					.setLabel(' ')
                    .setStyle("SECONDARY")
            )
        }
                
        client.on('interactionCreate', async interaction => {
            if (!interaction.isButton()) return;
            if (interaction.customId != "yes") {interaction.deferReply(); return};
            await interaction.reply({
                content: `<@${you.id}> is ✖, <@${friend.id}> is ⭕`,
                components: [
                    row1,
                    row2,
                    row3
                ],
            });
            interaction.deferReply();
        });

        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });

        collector.on('collect', i => {
            if (i.user.id === friend.id) {
                i.reply(`${i.user.id} clicked on the ${i.customId} button.`);
            } else {
                i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
            }
        });
    }
});