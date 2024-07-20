import {
    GuildMember,
    User
} from "discord.js";

import { serverId } from "../data/ids.json";
import { SendPunishmentLog } from "./logs";
import client from "../client";

async function Ban (
    user: User,
    author: GuildMember,
    reason: string
) {
    const guild = await client.guilds.fetch(serverId);

    const member = await guild.members.fetch(user.id);

    if (member && member.bannable) await member.send({ embeds: [ /* Colocar o embed aqui */ ] }).catch(console.error);

    await SendPunishmentLog(`O membro ${member} (${member.id}) foi **expulso** por ${author} (${author.id}) de **${guild.name}** pelo motivo: **${reason}**`);

    await guild.members.ban(user, { reason });
}

async function Unban (
    user: User,
    author: GuildMember,
    reason: string
) {
    const guild = await client.guilds.fetch(serverId);

    await guild.members.unban(user, reason);
}

async function Kick (
    member: GuildMember,
    author: GuildMember,
    reason: string
) {
    if (!member) throw Error;
    
    const guild = member.guild;
    await member.kick(reason);
}

async function Mute (
    member: GuildMember,
    timeout: number,
    reason: string
) {
    await member.timeout(timeout, reason);
}

async function Unmute (
    member: GuildMember,
    reason: string
) {
    const guild = member.guild;

    await member.timeout(null, reason);
}

export {
    Unmute,
    Unban,
    Kick,
    Mute,
    Ban,
};