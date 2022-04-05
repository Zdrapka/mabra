import EventListener from "../models/EventListener";
import CustomClient from "../models/CustomClient";

const Ready: EventListener = {
	name: "ready",
	once: true,
	callback: async (client: CustomClient) => {
		console.log(`Logged in as ${client.user?.tag} (${new Date()})`);
	},
};

export default Ready;
