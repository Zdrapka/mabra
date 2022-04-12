import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export default interface SlashCommand {
	data: any;
	callback(interaction: CommandInteraction): Promise<void>;
}
