import { TextChannel, ButtonInteraction, ChannelType, ThreadChannel, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { BuildCloseSuggestionTicketEmbed, BuildCloseSupportTicketEmbed } from "../utils/buildEmbed";
import { TicketActions } from "../utils/types";
import { SendTicketLog } from "../utils/logs";
import { second } from "../utils/utils";

async function getCorrespondingEmbed (channel: TextChannel)
{
    if (channel.name === "sugestões") return await BuildCloseSuggestionTicketEmbed();
    if (channel.name === "suporte") return await BuildCloseSupportTicketEmbed();

    return new EmbedBuilder()
    .setTitle("Algo deu errado...");
}

const singularName: { [channelName: string]: string } = {
    "sugestões": "sugestão"
}

const ticketCache = new Map<string, ThreadChannel>();

async function createTicket (interaction: ButtonInteraction)
{
    const currentTicket = ticketCache.get(interaction.user.id);
    
    if (currentTicket) return interaction.reply({ content: `Você já possui um ticket em ${currentTicket}`, ephemeral: true });
    
    const channel = interaction.channel as TextChannel;

    const ticketCategory = singularName[channel.name] || channel.name;

    const thread = await channel.threads.create({
        type: ChannelType.PrivateThread,
        invitable: false,
        name: `${interaction.user.username} | ${ticketCategory}`,
    });

    ticketCache.set(interaction.user.id, thread);

    SendTicketLog(interaction, "create");

    await thread.members.add(interaction.user);

    const closeTicketEmbed = await getCorrespondingEmbed(channel);

    const closeButton = new ButtonBuilder()
	.setStyle(ButtonStyle.Danger)
	.setCustomId("ticket:close")
	.setLabel("Fechar ticket");

	const row = new ActionRowBuilder<ButtonBuilder>()
	.setComponents(closeButton);

    thread.send({ content: "<@&1178324960603807795>", embeds: [ closeTicketEmbed ], components: [ row ] });
    
    await interaction.reply({ content: `Ticket criado em ${thread}.`, ephemeral: true });
}

async function closeTicket (interaction: ButtonInteraction)
{
    if (!ticketCache.get(interaction.user.id)) return await interaction.reply({ content: `Você não possui um ticket para fechar.`, ephemeral: true });

    ticketCache.delete(interaction.user.id);

    const ticket = interaction.channel as ThreadChannel;

    interaction.reply(`${interaction.user}, seu ticket será fechado em 10 segundos.`);

    setTimeout(() => {
        SendTicketLog(interaction, "close");
    
        ticket.members.cache.forEach(async member => await member.remove());
    }, second * 10);

}

export const buttonContext = "ticket";

export const execute = async (interaction: ButtonInteraction, action: TicketActions) => {
    if (action === "create") await createTicket(interaction);
    if (action === "close") await closeTicket(interaction);
}