import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
.setName("gatofogueira")
.setDescription("Miau 🔥🧺")

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reply = await interaction.reply({ content: "https://media.discordapp.net/attachments/1069465047451045941/1084998260927770675/cattoastingexpanded.gif", fetchReply: true });
    await reply.react("🐈");
}