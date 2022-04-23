import SlashCommand from "../models/SlashCommand";

const ping: SlashCommand = {
	name: "ping",
	description: "Pong!",
	callback: async ({ interaction, client }) => {
		await interaction.reply(`Pong! ${client.ws.ping}ms`);
	},
};

export default ping;
