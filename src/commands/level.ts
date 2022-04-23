import { MessageEmbed } from "discord.js";
import SlashCommand from "../models/SlashCommand";
import { findOrCreateMember } from "../utils/findOrCreate";
import { calcMessagesToNextLevel } from "../utils/levels";

const level: SlashCommand = {
	name: "level",
	description: "Get to know your level",
	options: [
		{
			name: "member",
			description: "The member to get the level of",
			type: "USER",
		},
	],
	callback: async ({ interaction, client, args }) => {
		const { prisma } = client;

		const member = args.getMember("member") || interaction.member;
		if (member.user.bot) {
			return await interaction.reply({
				content: "Bots don't have levels!",
				ephemeral: true,
			});
		}

		const { level, messageCount } = await findOrCreateMember(prisma, member);
		const toNextLevel = calcMessagesToNextLevel(messageCount);
		const emb = new MessageEmbed()
			.setTitle(`${member.user.username}'s level`)
			.setThumbnail(member.user.displayAvatarURL())
			.addField("Level", level.toString(), true)
			.addField("Total Messages", messageCount.toString(), true)
			.addField("Messages until next level", toNextLevel.toString())
			.setTimestamp(new Date());

		await interaction.reply({ embeds: [emb] });
	},
};

export default level;
