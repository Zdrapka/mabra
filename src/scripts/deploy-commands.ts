import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { readdirSync } from "fs";
import path from "path";
import config from "../config";
import SlashCommand from "../models/SlashCommand";

const rest = new REST({ version: "9" }).setToken(config.DISCORD_TOKEN);

const relativeReadDir = (dir: string) =>
	readdirSync(path.resolve(__dirname, dir)).filter(
		(file) => file.endsWith(".js") && file !== "index.js"
	);

const commands = [];
const commandFiles = relativeReadDir("../commands");

for (const file of commandFiles) {
	const command = require(`../commands/${file}`).default as SlashCommand;
	commands.push(command.data.toJSON());
}

rest
	.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {
		body: commands,
	})
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
