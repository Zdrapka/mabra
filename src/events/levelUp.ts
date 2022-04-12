import CustomClient from "../models/CustomClient";
import { GuildMember, TextChannel } from "discord.js";
import { EventListener } from "../models/EventListener";

const levelUp: EventListener = {
	name: "levelUp",
	once: false,
	async callback(
		member: GuildMember,
		channel: TextChannel,
		oldLevel: number,
		newLevel: number
	) {
		const { guild, client: _client } = member;
		const client = _client as CustomClient;

		await channel.send(`${member} has leveled up to level ${newLevel}!`);
	},
};

export default levelUp;
