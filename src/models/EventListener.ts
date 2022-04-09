import { ClientEvents } from "discord.js";

export default interface EventListener {
	name: keyof ClientEvents;
	once: boolean;
	callback: (...args: any[]) => void;
}
