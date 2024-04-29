import { EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import { PunishmentEmbedOptions, TickedEmbedOptions } from "./types";
import Basil from "./basilEmotions.json";

export const BuildSuggestionTicketEmbed = async (interaction: ChatInputCommandInteraction) => {
    const suggestionEmbed = await BuildTicketEmbed({
        fields: [
            {
                name: "Quer fazer uma sugestão?",
                value: "Simples! Clique no botão \`Criar ticket\` abaixo para registrar sua sugestão."
            },
			{
				name: "Observação",
				value:  "Sua sugestão é sempre bem-vinda! Aceitamos sugestões relacionadas ao **servidor** ou ao meu **canal do YouTube**."
			}
        ],
        guildName: interaction.guild?.name as string,
        image: "https://media.discordapp.net/attachments/1172662617354010695/1197696929866461244/ticket_de_sugestao.gif",
        color: 0x6a0eff,
    });

    return suggestionEmbed;
}

export const BuildSupportTicketEmbed = async (interaction: ChatInputCommandInteraction) => {
    const supportEmbed = await BuildTicketEmbed({
        fields: [
            {
                name: "Quer obter suporte?",
                value: "Fácil! Clique no botão \`Criar ticket\` abaixo para obter ajuda diretamente do suporte do servidor."
            },
			{
				name: "Observação",
				value: "Lembre-se de fornecer detalhes necessários sobre o problema para que possamos ajudá-lo(a) da melhor maneira possível."
			}
        ],
        guildName: interaction.guild?.name as string,
        image: "https://media.discordapp.net/attachments/1172662617354010695/1197696930369769492/ticket_de_suporte.gif",
        color: 0xcccccc,
    });

    return supportEmbed;
}

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