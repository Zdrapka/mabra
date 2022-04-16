import { PrismaClient } from "@prisma/client";
import { GuildMember, Message } from "discord.js";
import CustomClient from "../models/CustomClient";
import { EventListener } from "../models/EventListener";
import { findOrCreateMember, findOrCreateUser } from "../utils/findOrCreate";
import { calcLevel } from "../utils/levels";

const incrementMessageCount = async (prisma: PrismaClient, member: GuildMember, amount = 1) => {
	await prisma.member.update({
		where: { guildId_userId: { guildId: member.guild.id, userId: member.id } },
		data: { messageCount: { increment: amount } },
	});
};

const messageCreate: EventListener = {
	name: "messageCreate",
	once: false,
	async callback(message: Message) {
		const { author, guild, member, channel } = message;
		const client = message.client as CustomClient;

		if (!guild || !member || author.bot || message.system) return;

		await findOrCreateUser(client.prisma, author);
		let queriedMember = await findOrCreateMember(client.prisma, member);

		/* TODO Blacklist checks
		1. User
		2. Member
		3. Role
		4. Channel
		*/

		const lastMessage = await client.prisma.message.findFirst({
			where: { authorId: author.id, guildId: guild.id },
			orderBy: { createdAt: "desc" },
		});

		const timeDelta = lastMessage
			? (message.createdAt.getTime() - lastMessage.createdAt.getTime()) / 1000
			: Infinity;

		const COOLDOWN = 30;
		if (timeDelta < COOLDOWN) return;

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
		const calculatedLevel = calcLevel(queriedMember.messageCount);

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
