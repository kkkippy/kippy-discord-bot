import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

import { fightingDogs } from "../../data/general.json";

export const data = new SlashCommandBuilder()
.setName("x1decachorro")
.setDescription("Auau 🐶")

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const randomFightingDog = fightingDogs[Math.floor(Math.random() * fightingDogs.length)];
    
    const reply = await interaction.reply({ content: randomFightingDog, fetchReply: true });
    await reply.react("🐕");
}