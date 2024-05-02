import { ButtonInteraction, Guild, GuildMember, TextChannel, ThreadChannel } from "discord.js";
import { TicketActions } from "./types";

const punishmentLogChannelId   = "1230843907114532866";

const ticket = {
    "create": {
        logChannelId: "1178210754432868412",
        build: (member: GuildMember, ticket: ThreadChannel) => `${member} (${member.id}) **criou** um ticket em ${ticket}.`,
    },

    "close": {
        logChannelId: "1178331056580075651",
        build: (member: GuildMember, ticket: ThreadChannel) => `${member} (${member.id}) **fechou** seu ticket em ${ticket}.`,
    }
}

export const SendPunishmentLog = async (guild: Guild, reason: string) => {
    const punishmentLogChannel = guild?.channels.cache.get(punishmentLogChannelId) as TextChannel;

    if (punishmentLogChannel) punishmentLogChannel.send(reason);
}

export const SendTicketLog = (interaction: ButtonInteraction, action: TicketActions) => {
    const guild = interaction.guild;
    
    const ticketChannel = interaction.channel as ThreadChannel;
    
    const options = ticket[action];

    const ticketLogChannel = guild?.channels.cache.get(options.logChannelId) as TextChannel;

    ticketLogChannel.send(options.build(interaction.member as GuildMember, ticketChannel));
}