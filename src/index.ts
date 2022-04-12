import { client } from "./bot";
import config from "./config";

const main = async () => {
	client.login(config.DISCORD_TOKEN);
};

main()
	.catch((e) => {
		throw e;
	})
	.finally(() => {
		client.prisma.$disconnect();
	});
