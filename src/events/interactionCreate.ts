import EventListener from "../models/EventListener";
import { Interaction, CommandInteraction } from "discord.js";
import SlashCommand from "../models/SlashCommand";
import CustomClient from "../models/CustomClient";

const InteractionCreate: EventListener = {
	name: "interactionCreate",
	once: false,
	callback: async (interaction: Interaction) => {
		if (!interaction.isCommand) return;

		const cmdInteraction = interaction as CommandInteraction;
		const client = cmdInteraction.client as CustomClient;
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
	},
};

export default InteractionCreate;
