import { CloseTicketEmbedOptions, CreateTicketEmbedOptions, PunishmentEmbedOptions } from "./types";
import { EmbedBuilder, ChatInputCommandInteraction, ButtonBuilder, ButtonStyle, ActionRow, ActionRowBuilder } from "discord.js";
import Basil from "./basilEmotions.json";

export const BuildCloseSuggestionTicketEmbed = async () => {
	const suggestionEmbed = BuildCloseTicketEmbed({
		color: 0x6a0eff,
		image: "https://media.discordapp.net/attachments/1172662617354010695/1197939799173103808/te_atenderemos_em_breve_sugestoes.gif",
		fields: [
			{
				name: "a",
				value: "a"
			}
		]
	});

	return suggestionEmbed;
}

export const BuildCloseSupportTicketEmbed = async () => {
	const supportEmbed = BuildCloseTicketEmbed({
		color: 0xcccccc,
		image: "https://media.discordapp.net/attachments/1172662617354010695/1197939798753677312/te_atenderemos_em_breve_suporte.gif",
		description: "Por favor, nos diga qual é o motivo deste ticket e forneça as informações necessárias para que possamos te auxiliar da melhor forma possível.",
		fields: [
			{
				name: "Se for uma denúncia,",
				value: "por favor, informe o motivo da denúncia, as provas e o ID do usuário a ser denunciado."
			},
			{
				name: "Se for uma dúvida,",
				value: "conte-nos sobre o assunto e debateremos sobre ele juntos.\n\nEstamos aqui para te ajudar!"
			}
		],
	});

	return supportEmbed;
}

export const BuildCreateSuggestionTicketEmbed = async (interaction: ChatInputCommandInteraction) => {
    const suggestionEmbed = await BuildCreateTicketEmbed({
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

export const BuildCreateSupportTicketEmbed = async (interaction: ChatInputCommandInteraction) => {
    const supportEmbed = await BuildCreateTicketEmbed({
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

export const BuildCloseTicketEmbed = async (options: CloseTicketEmbedOptions) => {
	const closeTicketEmbed = new EmbedBuilder()
	.setTitle(`Aguarde um pouco...`)
	.setFields(options.fields)
	.setColor(options.color)
	.setImage(options.image)
	
	if (options.description) closeTicketEmbed.setDescription(options.description);

	return closeTicketEmbed;
}

export const BuildCreateTicketEmbed = async (options: CreateTicketEmbedOptions) => {
	const createTicketEmbed = new EmbedBuilder()
	.setTitle(`Olá, sejam bem-vindos(as) ao sistema de tickets da comunidade ${options.guildName}!`)
	.setFields(options.fields)
	.setColor(options.color)
	.setImage(options.image)

	if (options.description) createTicketEmbed.setDescription(options.description);

	return createTicketEmbed;
}

// Punishment
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