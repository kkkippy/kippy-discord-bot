import { BuildPunishmentEmbed } from "./buildEmbed";
import { Guild, Message, User } from "discord.js";
import { SendPunishmentLog } from "./logs";
import { minute } from "./utils";
import { mods } from "./mods";
import { client } from "../client";

const blacklistedContent = {
    "discord.com/invite": "Envio de convite de servidor.",
    "discord.gg":         "Envio de convite de servidor.",
}

async function MuteMember (message: Message, reason: string)
{
    const member = message.member;
    if (!member || !member?.kickable) return;

    if (mods[member.id]) return;
    
    if (message.deletable) await message.delete();
    
    const muteEmbed = await BuildPunishmentEmbed({
        title: `Você foi silenciado em ${message.guild?.name}.`,
        punishedBy: client.user as User,
        reason,
    });

    await member.send({ embeds: [ muteEmbed ] }).catch(console.log);
    await member?.timeout(minute * 10, reason);

    await SendPunishmentLog(message.guild as Guild, `O usuário ${message.member} (${message.member?.id}) foi silenciado **automaticamente** por 10 minutos pelo motivo: **${reason}**`);
}

export async function isBlacklisted (message: Message)
{
    for (const [content, reason] of Object.entries(blacklistedContent))
    {
        if (message.content.toLowerCase().includes(content))
        {
            MuteMember(message, reason);
            return true;
        };
    }

    return false;
}