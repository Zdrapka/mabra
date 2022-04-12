import { SlashCommandBuilder } from "@discordjs/builders";
import {
	ButtonInteraction,
	CommandInteraction,
	MessageButton,
} from "discord.js";

type ButtonSlashCommand =
	| {
			data: SlashCommandBuilder;
			buttons: MessageButton[];
			callback(interaction: CommandInteraction): Promise<void>;
			buttonCallback(bInteraction: ButtonInteraction): Promise<void>;
	  }
	| {
			data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
			buttons: MessageButton[];
			callback(interaction: CommandInteraction): Promise<void>;
			buttonCallback(bInteraction: ButtonInteraction): Promise<void>;
	  };

export default ButtonSlashCommand;
