import {
    ChatInputCommandInteraction,
    Guild,
    SlashCommandBuilder,
    User
} from "discord.js";

import {
    moderatorRole,
    supportRole,
    adminRole
} from "../../data/ids.json";

import { SendPunishmentLog } from "../../utils/logs";
import { Kick } from "../../utils/applyPunishment";

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
    moderatorRole,
    supportRole,
    adminRole
];

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reason = interaction.options.getString("motivo") || "Não especificado.";
    const user   = interaction.options.getUser("usuario") as User;

    const author = interaction.user;

    const guild = interaction.guild as Guild;
    
    try
    {
        const member = await guild.members.fetch(user.id);

        await Kick(member, reason);

        await interaction.reply(`O membro ${user} (${user.id}) foi expulso de **${guild.name}**.`);
    } catch (e)
    {
        await interaction.reply(`Não foi possível expulsar o usuário ${user} (${user.id}).\n${e}.`);
    }
}