import { PrismaClient } from "@prisma/client";
import { Client, ClientOptions, Collection, MessageButton } from "discord.js";
import glob from "glob";
import { promisify } from "util";
import ButtonSlashCommand from "./ButtonSlashCommand";
import CustomClientEvents from "./CustomClientEvents";
import EventListener from "./EventListener";
import SlashCommand from "./SlashCommand";

const globPromise = promisify(glob);

class _EventSignaturesOverride extends Client {
	on<K extends keyof CustomClientEvents>(
		event: K,
		listener: (...args: CustomClientEvents[K]) => Promise<void> | void
	): this {
		// This is fine as we want to override the parent class' function signature
		super.on(event as string, listener as never);
		return this;
	}
	once<K extends keyof CustomClientEvents>(
		event: K,
		listener: (...args: CustomClientEvents[K]) => Promise<void> | void
	): this {
		// This is fine as we want to override the parent class' function signature
		super.once(event as string, listener as never);
		return this;
	}
	public emit<K extends keyof CustomClientEvents>(
		event: K,
		...args: CustomClientEvents[K]
	): boolean {
		return super.emit(event as string, ...args);
	}
}

type ButtonId = NonNullable<MessageButton["customId"]>;

export default class CustomClient extends _EventSignaturesOverride {
	commands: Collection<SlashCommand["name"], SlashCommand> = new Collection();
	buttonCommands: Collection<ButtonSlashCommand["name"], ButtonSlashCommand> = new Collection();
	buttons: Collection<ButtonId, ButtonSlashCommand["name"]> = new Collection();
	prisma = new PrismaClient({ errorFormat: "pretty" });

	constructor(opts: ClientOptions) {
		super(opts);
	}

	/** The `login` parameter is useful for debugging BEFORE logging in to Discord
	 * e.g. invalid imports
	 */
	async start(login = true) {
		// Whenever possible, use the `ready` event listener to do any startup tasks.
		await Promise.all([this.registerEventListeners(), this.registerCommands()]);
		if (login) this.login(process.env.BOT_TOKEN);
	}

	async importFile(filePath: string) {
		return (await import(filePath))?.default;
	}

	async registerCommands() {
		const commandFiles = await globPromise(`${__dirname}/../commands/*{.js,.ts}`);
		commandFiles.forEach(async (filePath) => {
			const command: SlashCommand | ButtonSlashCommand | null = await this.importFile(
				filePath
			);
			if (!command) throw new Error(`Command ${filePath} does not have default export`);

			const isButton = (command: object): command is ButtonSlashCommand =>
				"buttons" in command;

			const isSlash = (command: object): command is SlashCommand =>
				"callback" in command && !isButton(command);

			if (isButton(command)) {
				const { buttons, name } = command;
				this.buttonCommands.set(name, command);
				buttons.forEach((b, i) => {
					if (!b.customId)
						throw new Error(`Button ${i} in command ${command} has no Custom ID`);
					this.buttons.set(b.customId, command.name);
				});
			}

			if (isSlash(command)) {
				this.commands.set(command.name, command);
			}
		});
	}

	async registerEventListeners() {
		const eventFiles = await globPromise(`${__dirname}/../events/*{.js,.ts}`);
		eventFiles.forEach(async (filePath) => {
			type EventNames = keyof CustomClientEvents;

			const event: EventListener<EventNames> | null = await this.importFile(filePath);
			if (!event) throw new Error(`Event ${filePath} does not have default export`);

			const { name, callback } = event;
			event.once ? this.once(name, callback) : this.on(name, callback);
		});
	}
}
