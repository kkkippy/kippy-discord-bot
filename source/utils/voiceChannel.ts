import {
    GuildMember
} from "discord.js";

interface VoiceChannel
{
    ownerId: string,
    channelId: string,
    canClaim: boolean,
}

const VoiceChannelsCache = new Map<string, VoiceChannel>();
// Map<ID do canal, VoiceChannel Object>

export const CreateVoiceChannel = async (member: GuildMember) => {
    
}