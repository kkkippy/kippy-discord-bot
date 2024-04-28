import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName("sapo")
.setDescription("Algo terrível acontecerá ao executar este comando...")
.setDMPermission(false);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reply = await interaction.reply({ content: "https://media.discordapp.net/attachments/1172662617354010695/1233847582288253071/sapo_da_chuva.png", fetchReply: true });
    await reply.react("🐸");
}