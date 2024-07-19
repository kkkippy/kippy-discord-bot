import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
.setName("cachorro-equilibrando-copo")
.setDescription("Auau 🥤🐶")

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reply = await interaction.reply({ content: "https://tenor.com/view/dog-water-balance-animal-fur-baby-gif-18087622", fetchReply: true });
    await reply.react("🐶");
}