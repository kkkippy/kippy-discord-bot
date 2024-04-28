const blacklistedContent = [
    "discord.gg",
    "discord.com/invite"
]

export function isBlacklisted (messageContent: string)
{
    for (const content of blacklistedContent)
    {
        if (messageContent.includes(content)) return true;
    }

    return false;
}