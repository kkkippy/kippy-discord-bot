import {
    punishmentLogChannel,
    serverId
} from "../data/ids.json";

import { TextChannel } from "discord.js";
import { client } from "../client";

export const SendPunishmentLog = async (message: string) => {
    const guild = await client.guilds.fetch(serverId);

    const channel = await guild.channels.fetch(punishmentLogChannel) as TextChannel;

    await channel.send(message).catch(console.error);
}