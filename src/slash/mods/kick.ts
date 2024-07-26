import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Guild,
    User
} from "discord.js";

import { RandomPhrase } from "../../utils/randomPhrase";
import { Kick } from "../../utils/applyPunishment";
import { isStaff } from "../../utils/isStaff";
import { roles } from "../../data/ids.json";

export const data = new SlashCommandBuilder()
.setName("kick")
.setDescription("Expulsa um usuário.")

.addUserOption(option =>
    option
    .setName("usuario")
    .setDescription("Selecione o usuário no qual deseja expulsar.")
    .setRequired(true)
)

.addStringOption(option =>
    option
    .setName("motivo")
    .setDescription("Descreva o motivo do banimento.")
)

export const requiredRoles = [
    roles.moderator,
    roles.support,
    roles.admin
];

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reason = interaction.options.getString("motivo") || "Não especificado.";
    const user   = interaction.options.getUser("usuario") as User;

    const author = interaction.user;
    const guild = interaction.guild as Guild;
    
    const deferReply = await interaction.deferReply();

    if (author.id === user.id) return deferReply.edit(RandomPhrase("expulsar a si mesmo!"));

    if (
        await isStaff(user.id) &&
        !interaction.memberPermissions?.has("Administrator")
    ) return deferReply.edit(`Está tentando expulsar seu colega de trabalho? 🤨`);

    try
    {
        const member = await guild.members.fetch(user.id);

        await Kick(member, author, reason);

        await deferReply.edit(`O membro ${user} (${user.id}) foi expulso de **${guild.name}**.`);
    } catch (e)
    {
        await deferReply.edit(`Não foi possível expulsar o usuário ${user} (${user.id}).\n${e}.`).catch(console.error);
        console.error(e);
    }
}