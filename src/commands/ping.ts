import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import CustomClient from "../models/CustomClient";
import SlashCommand from "../models/SlashCommand";

const ping: SlashCommand = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
	async callback(interaction: CommandInteraction): Promise<void> {
		const client = interaction.client as CustomClient;
		await interaction.reply(`Pong! ${client.ws.ping}ms`);
	},
};

export default ping;
