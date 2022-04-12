import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "fs";
import path from "path";
import config from "../config";
import SlashCommand from "../models/SlashCommand";

const rest = new REST({ version: "9" }).setToken(config.DISCORD_TOKEN);

const relativeReadDir = (dir: string): string[] => {
	dir = path.resolve(__dirname, dir);
	return fs.readdirSync(dir).filter(
		(filename) =>
			filename.endsWith(".js") &&
			filename !== "index.js" &&
			fs.readFileSync(`${dir}/${filename}`).length !== 0 // file isn't empty
	);
};

const commands = [];
const commandFiles = relativeReadDir("../commands");

for (const file of commandFiles) {
	const command = require(`../commands/${file}`).default as SlashCommand;
	commands.push((command.data as SlashCommandBuilder).toJSON());
}

rest
	.put(Routes.applicationCommands(config.CLIENT_ID), {
		body: commands,
	})
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
