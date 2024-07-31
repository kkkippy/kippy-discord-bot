import {
    GuildMember,
    User
} from "discord.js";

import client from "../client";

import { BuildBanEmbed } from "./punishmentEmbeds/ban";
import { SendPunishmentLog } from "./logs";
import { server } from "../data/ids.json";

async function Ban (
    user: User,
    author: User,
    reason: string
) {
    const guild = await client.guilds.fetch(server.id);

    const member = guild.members.cache.get(user.id);
    
    const banEmbed = await BuildBanEmbed(author, guild, reason);
    
    console.log(banEmbed);

    if (member && member.bannable) member.send({ embeds: [ banEmbed ] }).catch(console.error);

    await SendPunishmentLog(`O ${member ? "membro" : "usuário"} ${user} (${user.id}) foi **banido** por ${author} (${author.id}) de **${guild.name}** pelo motivo: **${reason}**`);

    guild.members.ban(user, { reason });
}

async function Unban (
    user: User,
    author: User,
    reason: string
) {
    const guild = await client.guilds.fetch(server.id);

    await guild.members.unban(user, reason);
}

async function Kick (
    member: GuildMember,
    author: User,
    reason: string
) {
    if (!member) throw Error;
    
    const guild = member.guild;
    await member.kick(reason);
}

async function Mute (
    member: GuildMember,
    author: User,
    timeout: number,
    reason: string
) {
    await member.timeout(timeout, reason);
}

async function Unmute (
    member: GuildMember,
    author: User,
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