import { ButtonInteraction, MessageButton } from "discord.js";
import SlashCommand from "./SlashCommand";

export default interface ButtonSlashCommand extends SlashCommand {
	buttons: MessageButton[];
	buttonCallback(bInteraction: ButtonInteraction): Promise<void>;
}
