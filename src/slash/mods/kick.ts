import {
    ChatInputCommandInteraction,
    Guild,
    GuildMember,
    SlashCommandBuilder,
    User
} from "discord.js";

import { Kick } from "../../utils/applyPunishment";
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
    roles.moderatorRole,
    roles.supportRole,
    roles.adminRole
];

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reason = interaction.options.getString("motivo") || "Não especificado.";
    const user   = interaction.options.getUser("usuario") as User;

    const author = interaction.member as GuildMember;
    const guild = interaction.guild as Guild;
    
    const deferReply = await interaction.deferReply();

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