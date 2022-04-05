import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import SlashCommand from "../models/SlashCommand";

const Ping: SlashCommand = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
	async callback(interaction: CommandInteraction): Promise<void> {
		await interaction.reply("Pong!");
	},
};

export default Ping;
