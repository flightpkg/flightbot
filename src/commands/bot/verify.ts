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
                //if (i.id == "verify"){
                    await interaction.editReply({
                        embeds: [captcha_embed],
                        files: [attachment],
                        components: []
                    });
                    console.log(`${captcha.value}`)
                //}
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

                    if (m.content != captcha.value) {
                        embed
                            .setTitle("❌ • Verify")
                            .setDescription(`<@${interaction.user.id}> failed to verify. Please run the \`/verify\` command again.`);
                        m.channel.send({
                            embeds: [embed]
                        });
                        m.delete();
                        collector.stop();
                        return;
                    }
                    
                    embed
                        .setTitle("✅ • Verify")
                        .setDescription(`<@${interaction.user.id}> has been verified into the guild.`)
                    
                    interaction.editReply(
                        {
                            embeds: [embed],
                            files: [],
                        }
                    );
                    // TODO: Change guild and role ids
                    client.guilds.cache.get("893767961750433813").members.cache.get(interaction.user.id).roles.add("958676346333179955");

                    collector.stop();
                    return;
                //}
            });
            return;
    }
});