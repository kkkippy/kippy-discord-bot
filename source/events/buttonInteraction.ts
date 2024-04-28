import { ButtonInteraction, Events } from "discord.js";
import { buttons } from "../handlers/buttons";

export type ButtonContext = "ticket";

export const eventName = Events.InteractionCreate;

export const execute = async (interaction: ButtonInteraction) => {
	if (!interaction.isButton()) return;

    const buttonProperties = interaction.customId.split(":");

    const buttonContext = buttonProperties.shift() as ButtonContext;

    const button = buttons.find(bt => bt.buttonContext === buttonContext);

    if (!button) return interaction.reply(`Nenhuma correspondência foi encontrada para o botão ${interaction.customId}`);

    button?.execute(interaction, ...buttonProperties);
}