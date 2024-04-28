import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName("server")
.setDescription("Mostra as informações do servidor.")
.setDMPermission(false);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply("...");
}