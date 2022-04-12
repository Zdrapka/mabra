import { ButtonInteraction, CommandInteraction, Interaction } from "discord.js";
import ButtonSlashCommand from "../models/ButtonSlashCommand";
import CustomClient from "../models/CustomClient";
import { EventListener } from "../models/EventListener";
import SlashCommand from "../models/SlashCommand";

const interactionCreate: EventListener = {
	name: "interactionCreate",
	once: false,
	async callback(interaction: Interaction) {
		const client = interaction.client as CustomClient;

		// SLASH COMMAND INTERACTION
		if (interaction.isCommand()) {
			const cmdInteraction = interaction as CommandInteraction;
			const command = client.commands.get(
				cmdInteraction.commandName
			) as SlashCommand;

			if (!command) return;

			try {
				await command.callback(cmdInteraction);
			} catch (error) {
				console.error(error);
				await cmdInteraction.reply({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			}
		}

		// BUTTON INTERACTION
		if (interaction.isButton()) {
			const btnInteraction = interaction as ButtonInteraction;
			const commandName = client.buttons.get(btnInteraction.customId);

			if (!commandName) {
				return await btnInteraction.reply({
					content: "There is no code for this button!",
					ephemeral: true,
				});
			}

			const command = client.commands.get(commandName) as ButtonSlashCommand;

			try {
				await command.buttonCallback(btnInteraction);
			} catch (error) {
				console.error(error);
				await btnInteraction.reply({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			}
		}
	},
};

export default interactionCreate;
