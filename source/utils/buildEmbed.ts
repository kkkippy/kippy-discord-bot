import { PunishmentEmbedOptions, TickedEmbedOptions } from "./types";
import { EmbedBuilder } from "discord.js";
import Basil from "./basilEmotions.json";

export const BuildTicketEmbed = async (options: TickedEmbedOptions) => {
	const ticketEmbed = new EmbedBuilder()
	.setTitle(`Olá, sejam bem-vindos(as) ao sistema de tickets da comunidade ${options.guildName}!`)
	.setFields(options.fields)
	.setColor(options.color)
	.setImage(options.image)

	if (options.description) ticketEmbed.setDescription(options.description);

	return ticketEmbed;
}

export const BuildPunishmentEmbed = async (options: PunishmentEmbedOptions) => {
    const punishmentEmbed = new EmbedBuilder()
	.setThumbnail(options.thumbnail || Basil.preocupado)
	.setColor(options.color || 0xe9db9a)
	.setTitle(options.title)
	.setFields(
		[
			{
				name: "Motivo:",
				value: options.reason || "Não especificado."
			},
			{
				name: "Acha que isso foi um engano?",
				value: "Se você acha que isso foi um engano, entre em contato com **@kkkippy**, **@woozinho** ou **@ianwu8** (aceitamos seu pedido de amizade)."
			}
		]
	)
	.setFooter(
		{
			text: `Punido por ${options.punishedBy.username} (${options.punishedBy.id})`,
			iconURL: options.punishedBy.avatarURL() as string
		}
	)

	if (options.description) punishmentEmbed.setDescription(options.description);
	if (options.fields)      punishmentEmbed.addFields(options.fields);
	if (options.image)       punishmentEmbed.setImage(options.image);

	return punishmentEmbed;
}