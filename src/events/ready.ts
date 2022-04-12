import { EventListener } from "../models/EventListener";
import CustomClient from "../models/CustomClient";
import { findOrCreateGuild } from "../utils/findOrCreate";

const ready: EventListener = {
	name: "ready",
	once: true,
	async callback(client: CustomClient) {
		client.guilds.cache.forEach(
			async (guild) => await findOrCreateGuild(client.prisma, guild)
		);

		console.log(`Logged in as ${client.user?.tag} (${new Date()})`);
	},
};

export default ready;
