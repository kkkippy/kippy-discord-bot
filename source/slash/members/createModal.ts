import { ActionRowBuilder, ChatInputCommandInteraction, ModalActionRowComponent, ModalActionRowComponentBuilder, ModalBuilder, SlashCommandBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export const data = new SlashCommandBuilder()
.setName("create-modal")
.setDescription("...")
.setDMPermission(false);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const testModal = new ModalBuilder()
        .setCustomId("modal")
        .setTitle("Título teste da modal")

    const nameInput = new TextInputBuilder()
        .setCustomId("nameInput")
        .setLabel("Qual o seu nome?")
        .setStyle(TextInputStyle.Short);

    const favoriteFoodInput = new TextInputBuilder()
        .setCustomId("favoriteFoodInput")
        .setLabel("Qual sua comida favorita?")
        .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(nameInput);
    const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(favoriteFoodInput);

    testModal.addComponents(firstActionRow, secondActionRow);

    await interaction.showModal(testModal);
}