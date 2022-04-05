import { readdirSync } from "fs";
import path from "path";
import config from "./config";
import CustomClient from "./models/CustomClient";
import EventListener from "./models/EventListener";
import SlashCommand from "./models/SlashCommand";

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

const eventFiles = relativeReadDir("./events").filter(
	(file) => file.endsWith(".js") && file !== "index.js"
);

for (const file of eventFiles) {
	const event = require(`./events/${file}`).default as EventListener;
	if (event.once) {
		client.once(event.name, (...args) => event.callback(...args));
	} else {
		client.on(event.name, (...args) => event.callback(...args));
	}
}

client.login(config.DISCORD_TOKEN);
