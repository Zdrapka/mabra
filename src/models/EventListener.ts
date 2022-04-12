import { ClientEvents, GuildMember, TextChannel } from "discord.js";

export interface CustomClientEvents extends ClientEvents {
	levelUp: [
		member: GuildMember,
		channel: TextChannel,
		oldLevel: number,
		newLevel: number
	];
}

export interface EventListener {
	name: keyof CustomClientEvents;
	once: boolean;
	callback: (...args: any[]) => void;
}
