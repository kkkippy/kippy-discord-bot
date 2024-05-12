import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName("ping")
.setDescription("pong")
.setDMPermission(false);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    return await interaction.reply("pong!");
}