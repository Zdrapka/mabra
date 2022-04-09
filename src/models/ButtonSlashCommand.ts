import { SlashCommandBuilder } from "@discordjs/builders";
import {
	ButtonInteraction,
	CommandInteraction,
	MessageButton,
} from "discord.js";

export default interface ButtonSlashCommand {
	data: SlashCommandBuilder;
	buttons: MessageButton[];
	callback(interaction: CommandInteraction): Promise<void>;
	buttonCallback(btnInteraction: ButtonInteraction): Promise<void>;
}
