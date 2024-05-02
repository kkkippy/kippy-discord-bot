import { TextChannel, ButtonInteraction, ChannelType, ThreadChannel } from "discord.js";
import { TicketActions } from "../utils/types";
import { SendTicketLog } from "../utils/logs";
import { second } from "../utils/utils";

const singularName: { [channelName: string]: string } = {
    "sugestões": "sugestão"
}

const ticketCache = new Map<string, ThreadChannel>();

async function createTicket (interaction: ButtonInteraction)
{
    const currentTicket = ticketCache.get(interaction.user.id);

    if (currentTicket) return interaction.reply({ content: `Você já possui um ticket em ${currentTicket}`, ephemeral: true });

    const channel = interaction.channel as TextChannel;

    const thread = await channel.threads.create({
        type: ChannelType.PrivateThread,
        invitable: false,
        name: `${interaction.user.id} | ${singularName[channel.name] || channel.name}`,
    });

    ticketCache.set(interaction.user.id, thread);

    SendTicketLog(interaction, "create");

    await thread.members.add(interaction.user);
    thread.send({ embeds: [  ] });
    
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