import ButtonSlashCommand from "./models/ButtonSlashCommand";
import CustomClient from "./models/CustomClient";
import { EventListener } from "./models/EventListener";
import SlashCommand from "./models/SlashCommand";
import { relativeReadDir } from "./utils";

export const client = new CustomClient({
	intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});

relativeReadDir(__dirname, "./commands").forEach((file) => {
	const command = require(`./commands/${file}`).default as SlashCommand;

	const commandName = command.data.name;
	client.commands.set(commandName, command);

	const isButtonSlashCommand = (object: any): object is SlashCommand => "buttons" in object;

	if (!isButtonSlashCommand(command)) return;

	const btnCommand = command as ButtonSlashCommand;
	for (const button of btnCommand.buttons) {
		if (!button.customId) {
			throw new Error(`Button from \`${commandName}\` must have customID`);
		}
		client.buttons.set(button.customId, commandName);
	}
});

relativeReadDir(__dirname, "./events").forEach((file) => {
	const event = require(`./events/${file}`).default as EventListener;
	if (event.once) {
		client.once(event.name, (...args) => event.callback(...args));
	} else {
		client.on(event.name, (...args) => event.callback(...args));
	}
});
