import dotenv from "dotenv";
import CustomClient from "./models/CustomClient";

dotenv.config();

export const client = new CustomClient({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

async function main() {
	client.start();
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(() => {
		client.prisma.$disconnect();
	});
