import { Message, TextChannel } from "discord.js";

const punishmentLogChannelId = "1230843907114532866";

export const SendLog = async (message: Message, reason: string) => {
    const guild = message.guild;

    const channel = guild?.channels.cache.get(punishmentLogChannelId) as TextChannel;

    if (channel) channel.send(reason);
}