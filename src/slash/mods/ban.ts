import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Guild,
    User,
} from "discord.js";

import { RandomPhrase } from "../../utils/randomPhrase";
import { Ban } from "../../utils/applyPunishment";
import { isStaff } from "../../utils/isStaff";
import { roles } from "../../data/ids.json";

export const data = new SlashCommandBuilder()
.setName("ban")
.setDescription("Bane um usuário.")

.addUserOption(option =>
    option
    .setName("usuario")
    .setDescription("Selecione o usuário no qual deseja banir.")
    .setRequired(true)
)

.addStringOption(option =>
    option
    .setName("motivo")
    .setDescription("Descreva o motivo do banimento.")
)

export const requiredRoles = [ roles.admin ];

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reason = interaction.options.getString("motivo") || "Não especificado.";
    const user   = interaction.options.getUser("usuario") as User;

    const guild = interaction.guild as Guild;
    const author = interaction.user;
    
    const deferReply = await interaction.deferReply();

    if (author.id === user.id) return deferReply.edit(RandomPhrase("banir a si mesmo!"));

    if (
        await isStaff(user.id) &&
        !interaction.memberPermissions?.has("Administrator")
    ) return deferReply.edit(`Está tentando banir seu colega de trabalho? 🤨`);

    try
    {
        await Ban(user, author, reason);

        await deferReply.edit(`O usuário ${user} (${user.id}) foi banido de **${guild.name}**.`);
    } catch (e)
    {
        await deferReply.edit(`Não foi possível banir o usuário ${user} (${user.id}).\n${e}.`).catch(console.error);
        console.error(e);
    }
}