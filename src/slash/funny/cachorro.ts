import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
.setName("cachorro")
.setDescription("Auau 🐶🐶")

interface DogData
{
    message: string,
    status: string
}

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const dog = await (await fetch("https://dog.ceo/api/breeds/image/random")).json() as DogData;

    const randomDog = dog.message;

    const reply = await interaction.reply({ content: randomDog, fetchReply: true });
    await reply.react("🐶");
}