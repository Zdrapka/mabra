import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export default interface SlashCommand {
	data: SlashCommandBuilder;
	callback(interaction: CommandInteraction): Promise<void>;
}
