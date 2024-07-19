import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
.setName("gato")
.setDescription("Miau :3")

interface CatData
{
    url: string,

    // Não sei se esses campos são necessários, mas se você achar necessário, basta descomentar e utilizar ao seu favor
    // height: number,
    // width: number,
    // id: string,
}

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const cat = await (await fetch("https://api.thecatapi.com/v1/images/search")).json() as CatData[];

    const randomCat = cat[0].url;

    const reply = await interaction.reply({ content: randomCat, fetchReply: true });
    await reply.react("🐈");
}