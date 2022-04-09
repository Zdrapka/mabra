import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import CustomClient from "../models/CustomClient";
import SlashCommand from "../models/SlashCommand";

const about: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("about")
		.setDescription("Get to know about the bot!"),

	async callback(interaction: CommandInteraction): Promise<void> {
		const client = interaction.client as CustomClient;

		const emb = new MessageEmbed()
			.setTitle(`About ${client.user?.tag}`)
			.setDescription("Beep boop work in progress")
			.setThumbnail(client.user?.displayAvatarURL() || "")
			.setTimestamp(new Date());

		await interaction.reply({ embeds: [emb] });
	},
};

export default about;
