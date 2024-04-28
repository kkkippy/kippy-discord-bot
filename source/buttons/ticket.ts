import { BaseGuildTextChannel, ButtonInteraction, ChannelType } from "discord.js";
import { TicketActions } from "../utils/types";

const singularName: { [channelName: string]: string } = {
    "sugestões": "sugestão"
}

async function createTicket (interaction: ButtonInteraction)
{
    const channel = interaction.channel as BaseGuildTextChannel;

    const thread = await channel.threads.create({
        type: ChannelType.PrivateThread,
        invitable: false,
        name: `${interaction.user.username} | ${singularName[channel.name] ?? channel.name}`,
    });

    await thread.members.add(interaction.user);
    
    await interaction.reply({ content: `Ticket criado em ${thread}.`, ephemeral: true });
    
    // await thread.send({ content: `<@&1178324960603807795>` });
}

async function closeTicket (interaction: ButtonInteraction)
{
    interaction.channel
}

export const buttonContext = "ticket";

export const execute = async (interaction: ButtonInteraction, action: TicketActions) => {
    if (action === "create") await createTicket(interaction);
    if (action === "close") await closeTicket(interaction);
}