import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
	throw new Error("Missing env vars");
}

const config = {
	DISCORD_TOKEN,
	CLIENT_ID,
	GUILD_ID,
};

export default config;
