import { TextChannel, ButtonInteraction, ChannelType, ThreadChannel } from "discord.js";
import { TicketActions } from "../utils/types";
import { SendTicketLog } from "../utils/logs";

const singularName: { [channelName: string]: string } = {
    "sugestões": "sugestão"
}

async function createTicket (interaction: ButtonInteraction)
{
    const channel = interaction.channel as TextChannel;

    const thread = await channel.threads.create({
        type: ChannelType.PrivateThread,
        invitable: false,
        name: `${interaction.user.id} | ${singularName[channel.name] || channel.name}`,
    });

    SendTicketLog(interaction, "create");

    await thread.members.add(interaction.user);
    
    await interaction.reply({ content: `Ticket criado em ${thread}.`, ephemeral: true });
    
    // await thread.send({ content: `<@&1178324960603807795>` });
}

async function closeTicket (interaction: ButtonInteraction)
{
    const ticket = interaction.channel as ThreadChannel;

    SendTicketLog(interaction, "close");

    ticket.members.cache.forEach(async member => await member.remove());
}

export const buttonContext = "ticket";

export const execute = async (interaction: ButtonInteraction, action: TicketActions) => {
    if (action === "create") await createTicket(interaction);
    if (action === "close") await closeTicket(interaction);
}