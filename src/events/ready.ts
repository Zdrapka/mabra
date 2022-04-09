import EventListener from "../models/EventListener";
import CustomClient from "../models/CustomClient";

const ready: EventListener = {
	name: "ready",
	once: true,
	async callback(client: CustomClient) {
		console.log(`Logged in as ${client.user?.tag} (${new Date()})`);
	},
};

export default ready;
