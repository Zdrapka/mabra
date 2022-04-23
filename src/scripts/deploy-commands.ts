import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";
import glob from "glob";
import { promisify } from "util";
import ButtonSlashCommand from "../models/ButtonSlashCommand";
import SlashCommand from "../models/SlashCommand";

dotenv.config();
const globPromise = promisify(glob);

async function main() {
	const commands: (SlashCommand | ButtonSlashCommand)[] = [];
	const commandFiles = await globPromise(`${__dirname}/../commands/*{.js,.ts}`);
	commandFiles.forEach(async (filePath) => {
		const command: SlashCommand | ButtonSlashCommand | null = (await import(filePath)).default;
		if (!command) throw new Error(`Command ${filePath} does not have default export`);

		commands.push(command);
	});

	const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

	const rest = new REST({ version: "9" }).setToken(BOT_TOKEN);
	await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
}

main()
	.then(() => console.log("Successfully deployed Slash Commands"))
	.catch((e) => console.error(e));
