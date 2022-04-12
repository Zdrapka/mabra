import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

type SlashCommand =
	| {
			data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
			callback(interaction: CommandInteraction): Promise<void>;
	  }
	| {
			data: SlashCommandBuilder;
			callback(interaction: CommandInteraction): Promise<void>;
	  };

export default SlashCommand;
