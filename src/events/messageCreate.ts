import { EventListener } from "../models/EventListener";
import { Guild, GuildMember, Message, User } from "discord.js";
import { findOrCreateMember, findOrCreateUser } from "../db/findOrCreate";
import CustomClient from "../models/CustomClient";
import { PrismaClient } from "@prisma/client";

const FILTER_STRING = "!!";
const COOLDOWN = 10;

const incrementMessageCount = async (
	prisma: PrismaClient,
	member: GuildMember,
	amount = 1
) => {
	await prisma.member.update({
		where: { guildId_userId: { guildId: member.guild.id, userId: member.id } },
		data: { messageCount: { increment: amount } },
	});
};

const calculateLevel = (n: number) => Math.floor(Math.cbrt(n));

const messageCreate: EventListener = {
	name: "messageCreate",
	once: false,
	async callback(message: Message) {
		const { author, guild, member, channel } = message;
		const client = message.client as CustomClient;

		if (!guild || !member || author.bot || message.system) return;

		const queriedUser = await findOrCreateUser(client.prisma, author);
		let queriedMember = await findOrCreateMember(client.prisma, member);

		/* TODO Blacklist checks
		1. User
		2. Member
		3. Role
		4. Channel
		*/

		const lastMessage = await client.prisma.message.findFirst({
			where: {
				authorId: author.id,
				guildId: guild.id,
			},
			orderBy: { createdAt: "desc" },
		});

		if (!message.content.startsWith(FILTER_STRING)) return;

		const timeDelta = lastMessage
			? (message.createdAt.getTime() - lastMessage.createdAt.getTime()) / 1000
			: Infinity;

		if (timeDelta < COOLDOWN)
			await client.prisma.message.create({
				data: {
					id: message.id,
					authorId: author.id,
					guildId: guild.id,
					channelId: message.channelId,
					createdAt: message.createdAt,
				},
			});

		await incrementMessageCount(client.prisma, member);

		queriedMember = await findOrCreateMember(client.prisma, member);

		const currentLevel = queriedMember.level;
		const calculatedLevel = calculateLevel(queriedMember.messageCount);

		if (currentLevel < calculatedLevel) {
			await client.prisma.member.update({
				where: { guildId_userId: { guildId: guild.id, userId: author.id } },
				data: { level: calculatedLevel },
			});

			client.emit("levelUp", member, channel, currentLevel, calculatedLevel);
		}
	},
};

export default messageCreate;
