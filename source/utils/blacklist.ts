import { Message } from "discord.js";
import { SendLog } from "./logs";
import { minute } from "./utils";
import { mods } from "./mods";

const blacklistedContent = {
    "discord.com/invite": "Envio de convite de servidor.",
    "discord.gg":         "Envio de convite de servidor.",
}

async function MuteMember (message: Message, reason: string)
{
    if (!message.member || !message.member?.kickable) return;

    if (mods[message.member.id]) return message.reply("vc é mod");
    
    if (message.deletable) await message.delete();
    
    await message.member?.timeout(minute * 10, reason);

    await SendLog(message, `O usuário ${message.member} (${message.member?.id}) foi silenciado **automaticamente** por 10 minutos pelo motivo: **${reason}**`);
}

export async function isBlacklisted (message: Message)
{
    for (const [content, reason] of Object.entries(blacklistedContent))
    {
        if (message.content.includes(content))
        {
            MuteMember(message, reason);
            return true;
        };
    }

    return false;
}