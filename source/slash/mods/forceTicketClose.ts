import { ChannelType, ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, ThreadChannel } from "discord.js";
import { SendTicketLog } from "../../utils/logs";

export const data = new SlashCommandBuilder()
.setName("force-ticket-close")
.setDescription("...")
.setDMPermission(false);

export const requiredPermission = PermissionFlagsBits.BanMembers;

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const ticket = interaction.channel as ThreadChannel;

    if (ticket.type != ChannelType.PrivateThread) return interaction.reply(`Este comando só pode ser utilizado em threads.`);

    (await ticket.members.fetch()).forEach(member => member.remove());

    await interaction.reply({ content: `Todos os membros foram removidos do ticket.`, ephemeral: true });

    SendTicketLog(interaction, "close", `${interaction.user} (${interaction.user.id}) **forçou o fechamento** do ticket ${ticket}.`);
}