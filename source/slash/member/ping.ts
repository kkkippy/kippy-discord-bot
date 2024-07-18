// Um clássico.

import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
.setName("ping")
.setDescription("pong")

export const execute = async (interaction: ChatInputCommandInteraction) => {
    return await interaction.reply("pong!");
}