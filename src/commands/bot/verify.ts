import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } from "discord.js";
import Captcha from "@haileybot/captcha-generator"
import { client } from "../..";

let captcha = new Captcha();
const attachment = new MessageAttachment(captcha.JPEGStream, "captcha.jpeg");

export default new Command({
    name: "verify",
    description: "Verify into the guild.",
    run: async ({ interaction }) => {
        
        const embed = new MessageEmbed()
            .setTitle("✅ • Verify")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")

        embed
            .addField("Verification", "Verify into the guild.")
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
                    .setLabel("Verify")
                    .setCustomId('verify')
                    .setStyle('PRIMARY'),
			);
            interaction.followUp({embeds: [embed], components: [row] });

            const captcha_embed = new MessageEmbed()
            .setTitle("✅ • Verify")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")

        embed
            .addField("Verification", "Enter the text you see in the image.")
            .setThumbnail(`attachment://${captcha.value}.jpeg`);
            

            client.on('interactionCreate', async i => {
                if (!i.isButton()) return;
                // i.deferUpdate()
                await interaction.editReply({
                    embeds: [captcha_embed],
                    files: [attachment],
                    components: []
                });
            });

            const filter = m => m.author.id == interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

            

            collector.on('collect', m => {
                var embed = new MessageEmbed()
                    .setTimestamp()
                    .setColor("#2F3136")
                    .setFooter({
                        text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                        iconURL: interaction.user.avatarURL()
                    })

                // while (true) {
                    if (m.content == captcha.value) {
                        embed
                            .setTitle("✅ • Verify")
                            .setDescription("You have been verified into the guild.");
                        m.reply({embeds: [embed]});
                        collector.stop();
                        // break;
                    } else {
                        embed
                            .setTitle("❌ • Verify")
                            .setDescription("Please try again.");
                        m.reply({embeds: [embed]});
                        collector.stop();
                        // break;
                    }
                //}
            });
    }
});