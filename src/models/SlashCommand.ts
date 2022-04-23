import {
	ChatInputApplicationCommandData,
	CommandInteraction,
	CommandInteractionOptionResolver,
	PermissionResolvable,
} from "discord.js";
import CustomClient from "./CustomClient";

interface SlashCommandCallbackOptions {
	client: CustomClient;
	interaction: CommandInteraction<"cached">;
	args: CommandInteractionOptionResolver<"cached">;
}

type SlashCommandCallback = (options: SlashCommandCallbackOptions) => Promise<void>;

/**
 * Read the docs [here](https://discord.com/developers/docs/interactions/application-commands#application-command-object)
 *
 * @example
 * ```json
 *	{
 *		"name": "blep",
 *		"type": 1,
 *		"description": "Send a random adorable animal photo",
 *		"options": [
 *			{
 *				"name": "animal",
 *				"description": "The type of animal",
 *				"type": 3,
 *				"required": true,
 *				"choices": [
 *					{
 *						"name": "Dog",
 *						"value": "animal_dog"
 *					},
 *					{
 *						"name": "Cat",
 *						"value": "animal_cat"
 *					},
 *					{
 *						"name": "Penguin",
 *						"value": "animal_penguin"
 *					}
 *				]
 *			},
 *			{
 *				"name": "only_smol",
 *				"description": "Whether to show only baby animals",
 *				"type": 5,
 *				"required": false
 *			}
 *		]
 *	}
 * ```
 */
export default interface SlashCommand extends ChatInputApplicationCommandData {
	/**
	 * Read more about permission objects
	 * [here](https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object)
	 */
	userPermissions?: PermissionResolvable[];
	callback: SlashCommandCallback;
}
