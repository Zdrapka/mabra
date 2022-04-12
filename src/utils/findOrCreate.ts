import { PrismaClient } from "@prisma/client";
import { Guild, GuildMember, User } from "discord.js";

// I'm using `upsert` without an `update` because it acts like a findOrCreate method if done so
// See https://github.com/prisma/docs/issues/640 for more info

export const findOrCreateGuild = async (prisma: PrismaClient, guild: Guild) => {
	const { id, name, createdAt, ownerId } = guild;
	const queriedGuild = await prisma.guild.upsert({
		where: { id },
		update: {},
		create: {
			id,
			name,
			createdAt,
			ownerId,
		},
	});
	return queriedGuild;
};

export const findOrCreateUser = async (prisma: PrismaClient, user: User) => {
	const { id, createdAt } = user;
	const queriedUser = await prisma.user.upsert({
		where: { id },
		create: { id, createdAt },
		update: {},
	});
	return queriedUser;
};

export const findOrCreateMember = async (
	prisma: PrismaClient,
	member: GuildMember
) => {
	// Make sure a user exists, to maintain database integrity
	await findOrCreateUser(prisma, member.user);

	const { guild, id: userId } = member;
	const queriedMember = prisma.member.upsert({
		where: { guildId_userId: { guildId: guild.id, userId } },
		create: { guildId: guild.id, userId },
		update: {},
	});
	return queriedMember;
};
