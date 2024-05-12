import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName("js")
.setDescription("...")
.setDMPermission(false);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reply = await interaction.reply({ content: "https://tenor.com/view/javascript-sad-programmer-sad-seal-js-frontend-gif-17530726856445672143", fetchReply: true });
    await reply.react("<:PensiveOrange:1217870358875603067>");

    return reply;
}