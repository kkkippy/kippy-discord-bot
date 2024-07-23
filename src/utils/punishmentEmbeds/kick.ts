import {
    EmbedBuilder,
    Guild,
    User
} from "discord.js";

import GenerateApologyField from "./generateField";

export const BuildKickEmbed =
async (
    banAuthor: User,
    guild: Guild,
    reason: string
) => new EmbedBuilder()
.setTitle(`Você foi expulso de ${guild.name}.`)
.setFields(
    {
        name: "Motivo do expulsamento:",
        value: `${reason}`
    },
    ...await GenerateApologyField()
)
.setFooter({
    iconURL: banAuthor.displayAvatarURL(),
    text: `Expulso por ${banAuthor.username} (${banAuthor.id})`
})
.setColor(0x0)
.setTimestamp()