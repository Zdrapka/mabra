import EventListener from "../models/EventListener";
import { findOrCreateGuild } from "../utils/findOrCreate";

const ready: EventListener<"ready"> = {
	name: "ready",
	once: true,
	callback(client) {
		client.guilds.cache.forEach(async (guild) => await findOrCreateGuild(client.prisma, guild));
		console.log(`Logged in as ${client.user?.tag} ${new Date().toISOString()}`);
	},
};

export default ready;
