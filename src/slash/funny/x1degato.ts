import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

import { fightingCats } from "../../data/general.json";

export const data = new SlashCommandBuilder()
.setName("x1degato")
.setDescription("Miau >:3")

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const randomFightingCat = fightingCats[Math.floor(Math.random() * fightingCats.length)];

    const reply = await interaction.reply({ content: randomFightingCat, fetchReply: true });
    await reply.react("🐈");
}