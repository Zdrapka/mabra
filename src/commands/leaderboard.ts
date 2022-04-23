import { MessageEmbed } from "discord.js";
import SlashCommand from "../models/SlashCommand";

const leaderboard: SlashCommand = {
	name: "leaderboard",
	description: "View the leaderboard",
	callback: async ({ interaction, client }) => {
		const { prisma } = client;
		const { guild } = interaction;

		if (!guild) return;

		const listOfMembers = await prisma.member.findMany({
			where: { guildId: guild.id },
			take: 10,
			orderBy: { messageCount: "desc" },
		});

		let stringList = "";
		listOfMembers.forEach((member, index) => {
			const memberMention = `<@${member.userId}>`;
			const { level: lvl, messageCount: msgCount } = member;

			stringList += `${
				index + 1
			}. ${memberMention} **Level ${lvl}** (${msgCount} messages)\n`;
		});
		const emb = new MessageEmbed()
			.setTitle(`${guild.name}'s leaderboard`)
			.setDescription(stringList);

		await interaction.reply({ embeds: [emb] });
	},
};

export default leaderboard;
