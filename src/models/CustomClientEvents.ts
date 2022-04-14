import { ClientEvents, GuildMember, TextChannel } from "discord.js";

export default interface CustomClientEvents extends ClientEvents {
	levelUp: [member: GuildMember, channel: TextChannel, oldLevel: number, newLevel: number];
}
