import { MessageEmbed } from "discord.js";
import SlashCommand from "../models/SlashCommand";

const about: SlashCommand = {
	name: "about",
	description: "Get to know about the bot!",
	callback: async ({ client, interaction }) => {
		const emb = new MessageEmbed()
			.setTitle(`About ${client.user?.tag}`)
			.setDescription("Beep boop work in progress")
			.setThumbnail(client.user?.displayAvatarURL() || "")
			.setTimestamp(new Date());

		await interaction.reply({ embeds: [emb] });
	},
};

export default about;
