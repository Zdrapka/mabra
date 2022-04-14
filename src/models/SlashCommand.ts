import {
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder,
	SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

type NoSubcommands = Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

type ValidSlashCommand =
	| NoSubcommands
	| SlashCommandBuilder
	| SlashCommandSubcommandBuilder
	| SlashCommandSubcommandGroupBuilder
	| SlashCommandSubcommandsOnlyBuilder;

export default interface SlashCommand {
	data: ValidSlashCommand;
	callback(interaction: CommandInteraction): Promise<void>;
}
