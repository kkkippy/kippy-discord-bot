import {
    channels,
    server
} from "../data/ids.json";

import { TextChannel } from "discord.js";
import client from "../client";

export const SendPunishmentLog = async (message: string) => {
    try
    {
        const guild = await client.guilds.fetch(server.id);

        const channel = await guild.channels.fetch(channels.punishmentLogChannel) as TextChannel;

        await channel.send(message);
    } catch (e) {
        console.error(`Erro ao enviar mensagem no canal de punição:`, e);
    }
}