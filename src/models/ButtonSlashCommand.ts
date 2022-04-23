import { ButtonInteraction, MessageButton } from "discord.js";
import CustomClient from "./CustomClient";
import SlashCommand from "./SlashCommand";

interface ButtonSlashCommandCallbackOptions {
	client: CustomClient;
	interaction: ButtonInteraction;
	buttonCustomId: string;
}

type ButtonSlashCommandCallback = (options: ButtonSlashCommandCallbackOptions) => Promise<void>;

export default interface ButtonSlashCommand extends SlashCommand {
	buttons: MessageButton[];
	buttonCallback: ButtonSlashCommandCallback;
}
