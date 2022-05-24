import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } from "discord.js";
import Captcha from "@haileybot/captcha-generator"
import { client } from "../..";
import path from "path"
import fs from "fs"

let captcha = new Captcha();

captcha.JPEGStream.pipe(fs.createWriteStream(path.join(__dirname, `${captcha.value}.jpeg`)))
const file  = path.join(__dirname, `${captcha.value}.jpeg`)
const attachment = new MessageAttachment(file);

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

            client.on('interactionCreate', async interaction => {
                if (!interaction.isButton()) return;
                if (interaction.customId != "verify") {interaction.deferReply(); return};
                await interaction.reply({
                    embeds: [captcha_embed],
                    files: [attachment]
                });
            });
    }
});