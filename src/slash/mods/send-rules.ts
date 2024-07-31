import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

import { roles } from "../../data/ids.json";

export const data = new SlashCommandBuilder()
.setName("send-rules")
.setDescription("Envia as regras no canal configurado.")

export const requiredRoles = [ roles.admin ];

export const execute = async (interaction: ChatInputCommandInteraction) => {
    return await interaction.reply("pong!");
}