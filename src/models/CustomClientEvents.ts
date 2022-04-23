import { ClientEvents, GuildMember, GuildTextBasedChannel } from "discord.js";
import CustomClient from "./CustomClient";

export default interface CustomClientEvents extends Omit<ClientEvents, "ready"> {
	ready: [client: CustomClient];
	levelUp: [member: GuildMember, channel: GuildTextBasedChannel, level: number];
}
