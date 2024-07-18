// https://api.thedailyshitpost.net/random

import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
.setName("shitpost")
.setDescription("Gera um shitpost (só é uma pena que maioria é shitpost gringo)")

interface ShitpostData
{
    url: string,
    error: string,
}

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const shitpost = await (await fetch("https://api.thedailyshitpost.net/random")).json() as ShitpostData;

    const randomShitpost = new URL(shitpost.url);
    const shitpostFileName = randomShitpost.pathname.split("/").pop();

    await interaction.reply({ content: `[${shitpostFileName}](${randomShitpost})` });
}