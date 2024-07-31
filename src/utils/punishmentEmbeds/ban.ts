import {
    EmbedBuilder,
    Guild,
    User
} from "discord.js";

import { basilMuitobravo } from "../../data/basilEmotes.json";
import GenerateApologyField from "./generateField";
import banGifs from "../../data/banGifs.json";

const randomBanGif = () => banGifs[Math.floor(Math.random() * banGifs.length)];

export const BuildBanEmbed =
async (
    banAuthor: User,
    guild: Guild,
    reason: string
) => new EmbedBuilder()
.setTitle(`Você foi banido de ${guild.name}.`)
.setThumbnail(basilMuitobravo)
.setImage(randomBanGif())
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
.setColor(0xe04c4c)
.setTimestamp()