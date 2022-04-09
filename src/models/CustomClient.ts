import { Client, ClientOptions, Collection } from "discord.js";
import SlashCommand from "./SlashCommand";

export default class CustomClient extends Client {
	public constructor(options: ClientOptions) {
		super(options);
	}

	/* A Collection that maps a *button ID* to a  *slash command name* */
	public buttons: Collection<string, string> = new Collection();
	public commands: Collection<string, SlashCommand> = new Collection();
}
