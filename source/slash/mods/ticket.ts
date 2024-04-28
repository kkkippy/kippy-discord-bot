import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName("create-tickets")
.setDescription("...")
.setDMPermission(false);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    let createButton = new ButtonBuilder()
    .setLabel("Criar ticket")
    .setCustomId("ticket:create")
    .setStyle(ButtonStyle.Success)

    let row = new ActionRowBuilder<ButtonBuilder>()
    .setComponents(createButton);

    interaction.reply({ content: "Teste", components: [ row ] });
}