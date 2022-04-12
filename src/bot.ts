import fs from "fs";
import path from "path";
import ButtonSlashCommand from "./models/ButtonSlashCommand";
import CustomClient from "./models/CustomClient";
import { EventListener } from "./models/EventListener";
import SlashCommand from "./models/SlashCommand";

export const client = new CustomClient({
	intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});

const relativeReadDir = (dir: string): string[] => {
	dir = path.resolve(__dirname, dir);
	return fs.readdirSync(dir).filter(
		(filename) =>
			filename.endsWith(".js") &&
			filename !== "index.js" &&
			fs.readFileSync(`${dir}/${filename}`).length !== 0 // file isn't empty
	);
};

const commandFiles = relativeReadDir("./commands");
for (const file of commandFiles) {
	const command = require(`./commands/${file}`).default as SlashCommand;

	const commandName = command.data.name;
	client.commands.set(commandName, command);

	const isButtonSlashCommand = (object: any): object is SlashCommand => {
		return "buttons" in object;
	};

	if (isButtonSlashCommand(command)) {
		const btnCommand = command as ButtonSlashCommand;
		for (const button of btnCommand.buttons) {
			if (!button.customId) {
				throw new Error(`Button from \`${commandName}\` must have customID`);
			}
			client.buttons.set(button.customId, commandName);
		}
	}
}

const eventFiles = relativeReadDir("./events");
for (const file of eventFiles) {
	const event = require(`./events/${file}`).default as EventListener;
	if (event.once) {
		client.once(event.name, (...args) => event.callback(...args));
	} else {
		client.on(event.name, (...args) => event.callback(...args));
	}
}
