import { CommandInteractionOptionResolver } from "discord.js";
import CustomClient from "../models/CustomClient";
import EventListener from "../models/EventListener";

const interactionCreate: EventListener<"interactionCreate"> = {
	name: "interactionCreate",
	async callback(interaction) {
		if (!interaction.inCachedGuild()) return;
		const client = interaction.client as CustomClient;

		/* SLASH COMMAND */
		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName);
			if (!command) return;

			try {
				await command.callback({
					client,
					interaction,
					args: interaction.options as CommandInteractionOptionResolver,
				});
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			}
		}

		/* BUTTON */
		if (interaction.isButton()) {
			const commandName = client.buttons.get(interaction.customId);
			if (!commandName) {
				return await interaction.reply({
					content: "There is no code for this button!",
					ephemeral: true,
				});
			}
			const command = client.buttonCommands.get(commandName);
			if (!command) return;
			try {
				await command.buttonCallback({
					client,
					interaction,
					buttonCustomId: interaction.customId,
				});
			} catch (error) {
				console.error(error);
				await interaction.reply({
					content: "There was an error while executing this command!",
					ephemeral: true,
				});
			}
		}
	},
};

export default interactionCreate;
