import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, MessageEmbed } from "discord.js";
import { findOrCreateMember } from "../db/findOrCreate";
import CustomClient from "../models/CustomClient";
import SlashCommand from "../models/SlashCommand";

const level: SlashCommand = {
	data: new SlashCommandBuilder()
		.setName("level")
		.setDescription("Get to know your level")
		.addUserOption((option) =>
			option.setName("member").setDescription("The member to get the level of")
		),

	async callback(interaction: CommandInteraction): Promise<void> {
		const client = interaction.client as CustomClient;
		const { prisma } = client;
		const member =
			(interaction.options.getMember("member") as GuildMember) ||
			(interaction.member as GuildMember);

		if (member.user.bot) {
			return await interaction.reply({
				content: "Bots don't have levels!",
				ephemeral: true,
			});
		}

		const { level, messageCount } = await findOrCreateMember(prisma, member);

		const emb = new MessageEmbed()
			.setTitle(`${member.user.username}'s level`)
			.setThumbnail(member.user.displayAvatarURL() || "")
			.addField("Level", level.toString(), true)
			.addField("Total Messages", messageCount.toString(), true)
			.setTimestamp(new Date());

		await interaction.reply({ embeds: [emb] });
	},
};

export default level;
