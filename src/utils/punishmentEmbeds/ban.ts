import {
    EmbedBuilder,
    Guild,
    User
} from "discord.js";

import GenerateApologyField from "./generateField";

export const BuildBanEmbed =
async (
    banAuthor: User,
    guild: Guild,
    reason: string
) => new EmbedBuilder()
.setTitle(`Você foi banido de ${guild.name}.`)
.setFields(
    {
        name: "Motivo do banimento:",
        value: `${reason}`
    },
    ...await GenerateApologyField()
)
.setFooter({
    iconURL: banAuthor.displayAvatarURL(),
    text: `Banido por ${banAuthor.username} (${banAuthor.id})`
})
.setColor(0x0)
.setTimestamp()