import { Client, ClientOptions, Collection } from "discord.js";
import SlashCommand from "./SlashCommand";

export default class CustomClient extends Client {
	public constructor(options: ClientOptions) {
		super(options);
	}

	// TODO add a custom interface/class for slash commands
	public commands: Collection<string, SlashCommand> = new Collection();
}
