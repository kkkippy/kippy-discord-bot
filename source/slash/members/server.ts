import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName("server")
.setDescription("Mostra as informações do servidor.")
.setDMPermission(false);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    return await interaction.reply(`O servidor possui **${interaction.guild?.memberCount}** membros.`);
}