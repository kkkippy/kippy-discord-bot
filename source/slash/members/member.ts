import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName("member")
.setDescription("...")
.setDMPermission(false);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply(`${interaction.member?.user.username} e ${interaction.client.guilds.cache.first()?.members.cache.get(interaction.user.id)}`);
    console.log(interaction.guild?.members.cache);
}