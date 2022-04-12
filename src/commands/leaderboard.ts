import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { findOrCreateMember, calcMessagesToNextLevel } from "../utils";
import CustomClient from "../models/CustomClient";
import SlashCommand from "../models/SlashCommand";

const level: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("leaderboard")
		.setDescription("View the leaderboard"),

	async callback(interaction: CommandInteraction): Promise<void> {
		const client = interaction.client as CustomClient;
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

export default level;
