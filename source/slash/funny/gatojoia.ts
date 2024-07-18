import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
.setName("gatojoia")
.setDescription("Miau 😺👍")

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reply = await interaction.reply({ content: "https://tenor.com/view/gato-joia-gif-27503164", fetchReply: true });
    await reply.react("😺");
    await reply.react("👍");
}