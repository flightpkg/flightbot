import { Command } from "../../structures/Command";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";

export default new Command({
    name: "info",
    description: "Show information about the bot",
    run: async ({ interaction }) => {
        
        var embed = new MessageEmbed()
            .setTitle("🤖 • Info")
            .setFooter({
                text: "Requested by " + interaction.user.username + "#" + interaction.user.discriminator,
                iconURL: interaction.user.avatarURL()
            })
            .setTimestamp()
            .setColor("#2F3136")

        embed
            .addField("Developers", "<@829372486780715018> and <@893762371770802227>")
            .addField("Cached Data", `Guilds: ${interaction.client.guilds.cache.size.toString()}\nUsers: ${interaction.client.users.cache.size.toString()}`)
            .addField("Bot Info",
                `Node: ${process.version}
                Discord.js: ${require("discord.js").version}
                Typescript: ${require("typescript").version}
                Version: ${require("../../../package.json").version}
                `
            )
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
                    .setURL("https://flightpkg.js.org/")
                    .setLabel("Website")
                    .setStyle('LINK'),
			);
            interaction.followUp({embeds: [embed], components: [row] });
    }
});