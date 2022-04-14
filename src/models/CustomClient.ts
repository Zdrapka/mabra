import { PrismaClient } from "@prisma/client";
import CustomClientEvents from "./CustomClientEvents";
import { Awaitable, Client, ClientEvents, ClientOptions, Collection } from "discord.js";
import SlashCommand from "./SlashCommand";

export default class CustomClient extends Client {
	public constructor(options: ClientOptions) {
		super(options);
	}

	/** A Collection that maps `Button#customId` to `SlashCommand#name`*/
	public buttons: Collection<string, string> = new Collection();

	/** A Collection that maps `SlashCommand#name` to the actual `SlashCommand`*/
	public commands: Collection<string, SlashCommand> = new Collection();

	/** Our Prisma instance */
	public prisma = new PrismaClient();

	public once<K extends keyof CustomClientEvents>(
		event: K,
		listener: (...args: CustomClientEvents[K]) => Awaitable<void>
	): this {
		// @ts-ignore
		return super.once(event, listener);
	}

	public on<K extends keyof CustomClientEvents>(
		event: K,
		listener: (...args: CustomClientEvents[K]) => Awaitable<void>
	): this {
		// @ts-ignore
		super.on(event, listener);
		return this;
	}
}
