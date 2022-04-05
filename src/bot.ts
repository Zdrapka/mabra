import { CommandInteraction, Interaction } from "discord.js";
import config from "./config";
import CustomClient from "./models/CustomClient";
import SlashCommand from "./models/SlashCommand";
import { readdirSync } from "fs";
import path from "path";

export const client = new CustomClient({
	intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});

const relativeReadDir = (dir: string) =>
	readdirSync(path.resolve(__dirname, dir));

const commandFiles = relativeReadDir("./commands").filter(
	(file) => file.endsWith(".js") && file !== "index.js"
);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`).default as SlashCommand;

	client.commands.set(command.data.name, command);
}

client.once("ready", () => {
	console.log(`Logged in as ${client.user?.tag} (${new Date()})`);
});

client.on("interactionCreate", async (interaction: Interaction) => {
	if (!interaction.isCommand) return;

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
});

client.login(config.DISCORD_TOKEN);
